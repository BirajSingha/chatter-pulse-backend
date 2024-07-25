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
exports.FriendsService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const friends_schema_1 = require("./schemas/friends.schema");
const user_schema_1 = require("../auth/schemas/user.schema");
let FriendsService = class FriendsService {
    constructor(friendModel, userModel) {
        this.friendModel = friendModel;
        this.userModel = userModel;
    }
    async addFriend(userId, addFriendDto) {
        const { friendId } = addFriendDto;
        const friendUser = await this.userModel.findById(friendId);
        if (!friendUser) {
            throw new common_1.NotFoundException('User not found!');
        }
        const existingFriend = await this.friendModel.findOne({ userId, friendId });
        if (existingFriend) {
            throw new common_1.BadRequestException('This user is already your friend');
        }
        const reciprocalFriend = await this.friendModel.findOne({
            userId: friendId,
            friendId: userId,
        });
        const newStatus = reciprocalFriend ? 'Friends' : 'Requested';
        const newFriend = new this.friendModel({
            userId,
            friendId,
            isFollowing: true,
            status: newStatus,
            createdAt: new Date(),
            updatedAt: new Date(),
        });
        await newFriend.save();
        if (reciprocalFriend) {
            reciprocalFriend.status = 'Friends';
            reciprocalFriend.isFollowing = true;
            reciprocalFriend.createdAt = new Date();
            reciprocalFriend.updatedAt = new Date();
            await reciprocalFriend.save();
        }
        return {
            message: 'Friend added successfully!',
            statusCode: 201,
        };
    }
    async deleteFriend(userId, deleteFriendDto) {
        const { friendId } = deleteFriendDto;
        const result = await this.friendModel.deleteOne({ userId, friendId });
        if (!result) {
            throw new common_1.NotFoundException('Friend not found!');
        }
        const reciprocalFriend = await this.friendModel.findOne({
            userId: friendId,
            friendId: userId,
        });
        if (reciprocalFriend) {
            reciprocalFriend.status = 'Requested';
            await reciprocalFriend.save();
        }
        return {
            message: 'Friend removed successfully!',
            statusCode: 200,
        };
    }
    async getFriendReqList(userId) {
        const friendReqList = await this.friendModel.find({
            friendId: userId,
            status: 'Requested',
        });
        if (friendReqList.length === 0) {
            return {
                statusCode: 200,
                message: 'No friend requests found!',
                data: [],
            };
        }
        const friendIds = friendReqList.map((friend) => friend.userId);
        const users = await this.userModel.find({ _id: { $in: friendIds } }, {
            password: 0,
            isVerified: 0,
            createdAt: 0,
            updatedAt: 0,
            verificationCode: 0,
            verificationCodeTimeStamp: 0,
            __v: 0,
        });
        return {
            statusCode: 200,
            message: 'Friend requests fetched successfully!',
            data: users,
        };
    }
    async getFriendsList(userId) {
        const friendsRelationships = await this.friendModel.find({ userId });
        const friendsOnly = friendsRelationships.filter((friend) => friend.status === 'Friends');
        if (friendsOnly.length === 0) {
            return {
                statusCode: 200,
                message: 'No friends found for this user!',
                data: [],
            };
        }
        const friendIds = friendsOnly.map((friend) => friend.friendId);
        const friends = await this.userModel.find({ _id: { $in: friendIds } }, {
            password: 0,
            isVerified: 0,
            createdAt: 0,
            updatedAt: 0,
            verificationCode: 0,
            verificationCodeTimeStamp: 0,
            __v: 0,
        });
        return {
            statusCode: 200,
            message: 'Friends list fetched successfully!',
            data: friends,
        };
    }
    async getSuggestedFriends(userId) {
        const friends = await this.friendModel.find({ userId, status: 'Friends' });
        const friendIds = friends.map((friend) => friend.friendId);
        const exclusionIds = [userId, ...friendIds];
        const suggestedList = await this.userModel.find({ _id: { $nin: exclusionIds } }, {
            password: 0,
            isVerified: 0,
            createdAt: 0,
            updatedAt: 0,
            verificationCode: 0,
            verificationCodeTimeStamp: 0,
            __v: 0,
        });
        return {
            statusCode: 200,
            message: 'Suggested friends fetched successfully!',
            data: suggestedList,
        };
    }
    async getFriendProfile(friendId) {
        const friend = await this.userModel.findOne({ _id: friendId });
        if (!friend) {
            throw new common_1.NotFoundException('User not found!');
        }
        return {
            statusCode: 200,
            message: 'User profile details fetched succussfully!',
            data: {
                _id: friend._id,
                username: friend.username,
                email: friend.email,
                address: friend.address,
                phone: friend.phone,
            },
        };
    }
    async updateFriendStatus(userId, userFollowDto) {
        const existingFriend = await this.friendModel.findOne({
            userId,
            friendId: userFollowDto.friendId,
        });
        if (!existingFriend) {
            throw new common_1.NotFoundException('Friend not found!');
        }
        existingFriend.isFollowing = userFollowDto.isFollowing;
        existingFriend.updatedAt = new Date();
        await existingFriend.save();
        return {
            message: 'Friend status updated successfully!',
            statusCode: 200,
        };
    }
    async blockUser(userId, blockUserDto) {
        const user = await this.friendModel.findById({
            userId,
        });
        if (!user) {
            throw new common_1.NotFoundException('User not found!');
        }
        const existingFriend = await this.friendModel.findOne({
            userId,
            friendId: blockUserDto.friendId,
        });
        if (!existingFriend) {
            throw new common_1.NotFoundException('Friend not found!');
        }
        existingFriend.status = 'Blocked';
        existingFriend.isBlocked = true;
        existingFriend.isMuted = true;
        existingFriend.isFollowing = false;
        existingFriend.updatedAt = new Date();
        await existingFriend.save();
        return {
            message: 'User blocked successfully!',
            statusCode: 200,
        };
    }
    async blockList(userId, blockUserDto) {
        const user = await this.friendModel.findById({ userId });
        if (!user) {
            throw new common_1.NotFoundException('User not found!');
        }
        const blockedUsers = await this.friendModel.find({
            userId,
            status: 'Blocked',
            isBlocked: blockUserDto.isBlocked,
        });
        if (blockedUsers.length === 0) {
            return {
                statusCode: 200,
                message: 'No blocked users found!',
                data: [],
            };
        }
        const friendIds = blockedUsers.map((friend) => friend.friendId);
        const users = await this.userModel.find({ _id: { $in: friendIds } }, {
            password: 0,
            isVerified: 0,
            createdAt: 0,
            updatedAt: 0,
            verificationCode: 0,
            verificationCodeTimeStamp: 0,
            __v: 0,
        });
        return {
            statusCode: 200,
            message: 'Blocked users fetched successfully!',
            data: users,
        };
    }
    async unBlockUser(userId, blockUserDto) {
        const user = await this.friendModel.findById({
            userId,
        });
        if (!user) {
            throw new common_1.NotFoundException('User not found!');
        }
        const existingFriend = await this.friendModel.findOne({
            userId,
            friendId: blockUserDto.friendId,
        });
        if (!existingFriend) {
            throw new common_1.NotFoundException('Friend not found!');
        }
        existingFriend.status = 'Friends';
        existingFriend.isBlocked = false;
        existingFriend.isMuted = false;
        existingFriend.isFollowing = true;
        existingFriend.updatedAt = new Date();
        await existingFriend.save();
        return {
            message: 'User unblocked successfully!',
            statusCode: 200,
        };
    }
    async muteUser(userId, blockUserDto) {
        const user = await this.friendModel.findById({
            userId,
        });
        if (!user) {
            throw new common_1.NotFoundException('User not found!');
        }
        const existingFriend = await this.friendModel.findOne({
            userId,
            friendId: blockUserDto.friendId,
        });
        if (!existingFriend) {
            throw new common_1.NotFoundException('Friend not found!');
        }
        existingFriend.status = 'Friends';
        existingFriend.isBlocked = false;
        existingFriend.isMuted = true;
        existingFriend.isFollowing = false;
        existingFriend.updatedAt = new Date();
        await existingFriend.save();
        return {
            message: 'User muted successfully!',
            statusCode: 200,
        };
    }
    async unMuteUser(userId, blockUserDto) {
        const user = await this.friendModel.findById({
            userId,
        });
        if (!user) {
            throw new common_1.NotFoundException('User not found!');
        }
        const existingFriend = await this.friendModel.findOne({
            userId,
            friendId: blockUserDto.friendId,
        });
        if (!existingFriend) {
            throw new common_1.NotFoundException('Friend not found!');
        }
        existingFriend.status = 'Friends';
        existingFriend.isBlocked = false;
        existingFriend.isMuted = false;
        existingFriend.isFollowing = true;
        existingFriend.updatedAt = new Date();
        await existingFriend.save();
        return {
            message: 'User unmuted successfully!',
            statusCode: 200,
        };
    }
    async searchFriends(userId, searchFriendDto) {
        const searchTerm = new RegExp(searchFriendDto.query, 'i');
        const friendRelationships = await this.friendModel.find({
            userId,
            status: 'Friends',
        });
        if (!friendRelationships.length) {
            throw new common_1.NotFoundException('No friends found!');
        }
        const friendIds = friendRelationships.map((friend) => friend.friendId);
        const friends = await this.userModel.find({
            _id: { $in: friendIds },
            username: { $regex: searchTerm },
        }, {
            password: 0,
            isVerified: 0,
            createdAt: 0,
            updatedAt: 0,
            verificationCode: 0,
            verificationCodeTimeStamp: 0,
            __v: 0,
        });
        return {
            statusCode: 200,
            message: 'Friends found successfully!',
            data: friends,
        };
    }
};
exports.FriendsService = FriendsService;
exports.FriendsService = FriendsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(friends_schema_1.Friend.name)),
    __param(1, (0, mongoose_1.InjectModel)(user_schema_1.User.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model])
], FriendsService);
//# sourceMappingURL=friends.service.js.map