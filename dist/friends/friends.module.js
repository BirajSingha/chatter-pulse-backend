"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FriendsModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const friends_schema_1 = require("./schemas/friends.schema");
const user_schema_1 = require("../auth/schemas/user.schema");
const friends_controller_1 = require("./friends.controller");
const friends_service_1 = require("./friends.service");
const users_module_1 = require("../users/users.module");
let FriendsModule = class FriendsModule {
};
exports.FriendsModule = FriendsModule;
exports.FriendsModule = FriendsModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([{ name: friends_schema_1.Friend.name, schema: friends_schema_1.FriendSchema }]),
            mongoose_1.MongooseModule.forFeature([{ name: user_schema_1.User.name, schema: user_schema_1.UserSchema }]),
            users_module_1.UsersModule,
        ],
        controllers: [friends_controller_1.FriendsController],
        providers: [friends_service_1.FriendsService],
        exports: [friends_service_1.FriendsService],
    })
], FriendsModule);
//# sourceMappingURL=friends.module.js.map