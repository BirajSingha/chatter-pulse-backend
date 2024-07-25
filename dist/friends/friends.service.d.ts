import { Model } from 'mongoose';
import { FriendDocument } from './schemas/friends.schema';
import { User, UserDocument } from 'src/auth/schemas/user.schema';
import { AddFriendDto, BlockUserDto, DeleteFriendDto, SearchFriendDto, UserFollowDto } from './dto/friends.dto';
type Result = {
    message: string;
    statusCode: number;
    data: {
        _id: string;
        username: string;
        email: string;
        phone: string;
        address: string;
    };
};
type ReqResust = {
    message: string;
    statusCode: number;
};
export declare class FriendsService {
    private friendModel;
    private userModel;
    constructor(friendModel: Model<FriendDocument>, userModel: Model<UserDocument>);
    addFriend(userId: string, addFriendDto: AddFriendDto): Promise<ReqResust>;
    deleteFriend(userId: string, deleteFriendDto: DeleteFriendDto): Promise<{
        message: string;
        statusCode: number;
    }>;
    getFriendReqList(userId: string): Promise<{
        statusCode: number;
        message: string;
        data: (import("mongoose").Document<unknown, {}, UserDocument> & User & import("mongoose").Document<unknown, any, any> & Required<{
            _id: string;
        }>)[];
    }>;
    getFriendsList(userId: string): Promise<{
        statusCode: number;
        message: string;
        data: (import("mongoose").Document<unknown, {}, UserDocument> & User & import("mongoose").Document<unknown, any, any> & Required<{
            _id: string;
        }>)[];
    }>;
    getSuggestedFriends(userId: string): Promise<{
        statusCode: number;
        message: string;
        data: (import("mongoose").Document<unknown, {}, UserDocument> & User & import("mongoose").Document<unknown, any, any> & Required<{
            _id: string;
        }>)[];
    }>;
    getFriendProfile(friendId: string): Promise<Result>;
    updateFriendStatus(userId: string, userFollowDto: UserFollowDto): Promise<{
        message: string;
        statusCode: number;
    }>;
    blockUser(userId: string, blockUserDto: BlockUserDto): Promise<{
        message: string;
        statusCode: number;
    }>;
    blockList(userId: string, blockUserDto: BlockUserDto): Promise<{
        statusCode: number;
        message: string;
        data: (import("mongoose").Document<unknown, {}, UserDocument> & User & import("mongoose").Document<unknown, any, any> & Required<{
            _id: string;
        }>)[];
    }>;
    unBlockUser(userId: string, blockUserDto: BlockUserDto): Promise<{
        message: string;
        statusCode: number;
    }>;
    muteUser(userId: string, blockUserDto: BlockUserDto): Promise<{
        message: string;
        statusCode: number;
    }>;
    unMuteUser(userId: string, blockUserDto: BlockUserDto): Promise<{
        message: string;
        statusCode: number;
    }>;
    searchFriends(userId: string, searchFriendDto: SearchFriendDto): Promise<{
        statusCode: number;
        message: string;
        data: (import("mongoose").Document<unknown, {}, UserDocument> & User & import("mongoose").Document<unknown, any, any> & Required<{
            _id: string;
        }>)[];
    }>;
}
export {};
