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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const mail_service_1 = require("../mail/mail.service");
const users_service_1 = require("../users/users.service");
let AuthService = class AuthService {
    constructor(usersService, jwtService, mailService) {
        this.usersService = usersService;
        this.jwtService = jwtService;
        this.mailService = mailService;
    }
    async authenticate(input) {
        const user = await this.validateUser(input);
        if (!user) {
            throw new common_1.NotFoundException('Invalid credentials');
        }
        return this.signIn(user);
    }
    async validateUser(input) {
        const user = await this.usersService.findUserByEmail(input.email);
        if (user && user.password === input.password) {
            return {
                _id: user._id.toString(),
                username: user.username,
                email: user.email,
                phone: user.phone,
                address: user.address,
                isVerified: user.isVerified,
                createdAt: user.createdAt,
            };
        }
        return null;
    }
    async signIn(user) {
        const tokenPayload = {
            userId: user._id,
            email: user.email,
        };
        const accessToken = await this.jwtService.signAsync(tokenPayload);
        if (user.isVerified === false) {
            const verificationCode = Math.floor(1000 + Math.random() * 9000).toString();
            await this.mailService.sendVerificationCode(user.email, verificationCode);
            await this.usersService.saveVerificationCode(user.email, verificationCode);
            throw new common_1.UnauthorizedException({
                statusCode: 401,
                message: 'Account not verified! Please check your email for the verification code.',
                accessToken: accessToken,
                data: {
                    _id: user._id,
                    username: user.username,
                    email: user.email,
                    phone: user.phone,
                    address: user.address,
                    isVerified: user.isVerified,
                    createdAt: user.createdAt,
                },
            });
        }
        return {
            statusCode: 200,
            message: 'Logged in successfully!',
            accessToken: accessToken,
            data: {
                _id: user._id,
                username: user.username,
                email: user.email,
                phone: user.phone,
                address: user.address,
                isVerified: user.isVerified,
                createdAt: user.createdAt,
            },
        };
    }
    async signUp(SignupDto) {
        const existingUser = await this.usersService.findUserByEmail(SignupDto.email);
        if (existingUser) {
            throw new common_1.UnauthorizedException('Email already in use!');
        }
        const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        if (!passwordPattern.test(SignupDto.password)) {
            throw new common_1.BadRequestException('Password does not meet complexity requirements!');
        }
        const newUser = await this.usersService.createUser(SignupDto);
        if (!newUser) {
            throw new common_1.BadRequestException('Failed to create user');
        }
        const verificationCode = Math.floor(1000 + Math.random() * 9000).toString();
        await this.mailService.sendVerificationCode(newUser.email, verificationCode);
        await this.usersService.saveVerificationCode(newUser.email, verificationCode);
        const tokenPayload = {
            userId: newUser._id,
            email: newUser.email,
        };
        const accessToken = await this.jwtService.signAsync(tokenPayload);
        return {
            accessToken: accessToken,
            message: 'Account created successfully!',
            statusCode: 201,
        };
    }
    async getProfile(userId) {
        const user = await this.usersService.findUserById(userId);
        if (!user) {
            throw new common_1.UnauthorizedException('User not found');
        }
        return {
            _id: user._id,
            username: user.username,
            email: user.email,
            phone: user.phone,
            address: user.address,
            isVerified: user.isVerified,
            createdAt: user.createdAt,
        };
    }
    async updateProfile(userId, updateProfileDto) {
        const user = await this.usersService.findUserById(userId);
        if (!user) {
            throw new common_1.UnauthorizedException('User not found');
        }
        if (updateProfileDto.username) {
            user.username = updateProfileDto.username;
        }
        if (updateProfileDto.phone) {
            user.phone = updateProfileDto.phone;
        }
        if (updateProfileDto.address) {
            user.address = updateProfileDto.address;
        }
        await this.usersService.saveUser(user);
        return {
            _id: user._id,
            username: user.username,
            email: user.email,
            phone: user.phone,
            address: user.address,
            isVerified: user.isVerified,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
        };
    }
    async reqVerifyAccount(userId) {
        const user = await this.usersService.findUserById(userId);
        if (!user) {
            throw new common_1.UnauthorizedException('User not found');
        }
        if (user && user.isVerified) {
            throw new common_1.BadRequestException('Account already verified!');
        }
        const verificationCode = Math.floor(1000 + Math.random() * 9000).toString();
        await this.mailService.sendVerificationCode(user.email, verificationCode);
        await this.usersService.saveVerificationCode(user.email, verificationCode);
        return {
            message: 'Verification code sent successfully! Please check your email.',
            statusCode: 200,
        };
    }
    async verifyAccount(input) {
        const user = await this.usersService.verifyCode(input.email, input.verificationCode);
        if (!user) {
            throw new common_1.BadRequestException('Invalid verification code');
        }
        return { message: 'Account verified successfully!', statusCode: 200 };
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [users_service_1.UsersService,
        jwt_1.JwtService,
        mail_service_1.MailService])
], AuthService);
//# sourceMappingURL=auth.service.js.map