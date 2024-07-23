"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const user_schema_1 = require("../auth/schemas/user.schema");
let UsersService = class UsersService {
    constructor(userModel) {
        this.userModel = userModel;
    }
    async findUserByEmail(email) {
        return this.userModel.findOne({ email }).exec();
    }
    async findUserById(id) {
        return this.userModel.findById(id).exec();
    }
    async createUser(SignupDto) {
        const createdUser = new this.userModel({
            ...SignupDto,
            createdAt: new Date(),
            updatedAt: new Date(),
        });
        return createdUser.save();
    }
    async saveUser(user) {
        return this.userModel
            .findByIdAndUpdate(user._id, user, { new: true })
            .exec();
    }
    async saveVerificationCode(email, verificationCode) {
        await this.userModel
            .updateOne({ email }, [
            {
                $set: {
                    verificationCode: verificationCode,
                    verificationCodeTimeStamp: new Date(),
                },
            },
        ])
            .exec();
    }
    async verifyCode(email, verificationCode) {
        const user = await this.findUserByEmail(email);
        if (user) {
            const now = new Date();
            const timestamp = new Date(user.verificationCodeTimeStamp);
            const diff = now.getTime() - timestamp.getTime();
            if (diff <= 60000 && user.verificationCode === verificationCode) {
                await this.userModel
                    .updateOne({ email }, [
                    {
                        $set: {
                            isVerified: true,
                            verificationCode: '',
                            verificationCodeTimeStamp: null,
                        },
                    },
                ])
                    .exec();
                return user;
            }
            else if (diff > 60000) {
                await this.userModel
                    .updateOne({ email }, [
                    {
                        $set: {
                            verificationCode: '',
                            verificationCodeTimeStamp: null,
                        },
                    },
                ])
                    .exec();
                throw new common_1.BadRequestException('Verification code has expired!');
            }
        }
        return undefined;
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(user_schema_1.User.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], UsersService);
//# sourceMappingURL=users.service.js.map