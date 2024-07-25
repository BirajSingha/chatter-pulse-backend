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
exports.FriendsController = void 0;
const common_1 = require("@nestjs/common");
const friends_service_1 = require("./friends.service");
const friends_dto_1 = require("./dto/friends.dto");
const auth_gaurd_1 = require("../auth/gaurds/auth.gaurd");
let FriendsController = class FriendsController {
    constructor(friendsService) {
        this.friendsService = friendsService;
    }
    async addFriend(request, addFriendDto) {
        return this.friendsService.addFriend(request.user._id, addFriendDto);
    }
    async deleteFriend(request, deleteFriendDto) {
        return this.friendsService.deleteFriend(request.user._id, deleteFriendDto);
    }
    async getSuggestedFriends(request) {
        return this.friendsService.getSuggestedFriends(request.user._id);
    }
    async getFriendReqList(request) {
        return this.friendsService.getFriendReqList(request.user._id);
    }
    async getFriendsList(request) {
        return this.friendsService.getFriendsList(request.user._id);
    }
    async getFriendProfile(friendId) {
        return this.friendsService.getFriendProfile(friendId);
    }
    async updateFriendStatus(request, userFollowDto) {
        return this.friendsService.updateFriendStatus(request.user._id, userFollowDto);
    }
    async blockUser(request, blockUserDto) {
        return this.friendsService.blockUser(request.user._id, blockUserDto);
    }
    async unBlockUser(request, blockUserDto) {
        return this.friendsService.unBlockUser(request.user._id, blockUserDto);
    }
    async muteUser(request, blockUserDto) {
        return this.friendsService.muteUser(request.user._id, blockUserDto);
    }
    async unMuteUser(request, blockUserDto) {
        return this.friendsService.unMuteUser(request.user._id, blockUserDto);
    }
    async blockList(request, blockUserDto) {
        return this.friendsService.blockList(request.user._id, blockUserDto);
    }
    async searchFriends(request, searchFriendDto) {
        return this.friendsService.searchFriends(request.user._id, searchFriendDto);
    }
};
exports.FriendsController = FriendsController;
__decorate([
    (0, common_1.HttpCode)(201),
    (0, common_1.UseGuards)(auth_gaurd_1.AuthGaurd),
    (0, common_1.Post)('add-friend'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, friends_dto_1.AddFriendDto]),
    __metadata("design:returntype", Promise)
], FriendsController.prototype, "addFriend", null);
__decorate([
    (0, common_1.HttpCode)(200),
    (0, common_1.UseGuards)(auth_gaurd_1.AuthGaurd),
    (0, common_1.Post)('remove-friend'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, friends_dto_1.DeleteFriendDto]),
    __metadata("design:returntype", Promise)
], FriendsController.prototype, "deleteFriend", null);
__decorate([
    (0, common_1.HttpCode)(200),
    (0, common_1.UseGuards)(auth_gaurd_1.AuthGaurd),
    (0, common_1.Get)('suggested'),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], FriendsController.prototype, "getSuggestedFriends", null);
__decorate([
    (0, common_1.HttpCode)(200),
    (0, common_1.UseGuards)(auth_gaurd_1.AuthGaurd),
    (0, common_1.Get)('friend-requests'),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], FriendsController.prototype, "getFriendReqList", null);
__decorate([
    (0, common_1.HttpCode)(200),
    (0, common_1.UseGuards)(auth_gaurd_1.AuthGaurd),
    (0, common_1.Get)('list'),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], FriendsController.prototype, "getFriendsList", null);
__decorate([
    (0, common_1.HttpCode)(200),
    (0, common_1.UseGuards)(auth_gaurd_1.AuthGaurd),
    (0, common_1.Get)('profile/:friendId'),
    __param(0, (0, common_1.Param)('friendId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], FriendsController.prototype, "getFriendProfile", null);
__decorate([
    (0, common_1.HttpCode)(200),
    (0, common_1.UseGuards)(auth_gaurd_1.AuthGaurd),
    (0, common_1.Put)('follow'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, friends_dto_1.UserFollowDto]),
    __metadata("design:returntype", Promise)
], FriendsController.prototype, "updateFriendStatus", null);
__decorate([
    (0, common_1.HttpCode)(200),
    (0, common_1.UseGuards)(auth_gaurd_1.AuthGaurd),
    (0, common_1.Put)('block'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, friends_dto_1.BlockUserDto]),
    __metadata("design:returntype", Promise)
], FriendsController.prototype, "blockUser", null);
__decorate([
    (0, common_1.HttpCode)(200),
    (0, common_1.UseGuards)(auth_gaurd_1.AuthGaurd),
    (0, common_1.Put)('unblock'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, friends_dto_1.BlockUserDto]),
    __metadata("design:returntype", Promise)
], FriendsController.prototype, "unBlockUser", null);
__decorate([
    (0, common_1.HttpCode)(200),
    (0, common_1.UseGuards)(auth_gaurd_1.AuthGaurd),
    (0, common_1.Put)('mute'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, friends_dto_1.BlockUserDto]),
    __metadata("design:returntype", Promise)
], FriendsController.prototype, "muteUser", null);
__decorate([
    (0, common_1.HttpCode)(200),
    (0, common_1.UseGuards)(auth_gaurd_1.AuthGaurd),
    (0, common_1.Put)('unmute'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, friends_dto_1.BlockUserDto]),
    __metadata("design:returntype", Promise)
], FriendsController.prototype, "unMuteUser", null);
__decorate([
    (0, common_1.HttpCode)(200),
    (0, common_1.UseGuards)(auth_gaurd_1.AuthGaurd),
    (0, common_1.Put)('block-list'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, friends_dto_1.BlockUserDto]),
    __metadata("design:returntype", Promise)
], FriendsController.prototype, "blockList", null);
__decorate([
    (0, common_1.HttpCode)(200),
    (0, common_1.UseGuards)(auth_gaurd_1.AuthGaurd),
    (0, common_1.Post)('friend-search'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, friends_dto_1.SearchFriendDto]),
    __metadata("design:returntype", Promise)
], FriendsController.prototype, "searchFriends", null);
exports.FriendsController = FriendsController = __decorate([
    (0, common_1.Controller)('friends'),
    __metadata("design:paramtypes", [friends_service_1.FriendsService])
], FriendsController);
//# sourceMappingURL=friends.controller.js.map