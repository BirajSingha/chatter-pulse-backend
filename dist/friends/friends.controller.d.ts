import { FriendsService } from './friends.service';
import { AddFriendDto, BlockUserDto, DeleteFriendDto, SearchFriendDto, UserFollowDto } from './dto/friends.dto';
export declare class FriendsController {
    private readonly friendsService;
    constructor(friendsService: FriendsService);
    addFriend(request: any, addFriendDto: AddFriendDto): Promise<{
        message: string;
        statusCode: number;
    }>;
    deleteFriend(request: any, deleteFriendDto: DeleteFriendDto): Promise<{
        message: string;
        statusCode: number;
    }>;
    getSuggestedFriends(request: any): Promise<{
        statusCode: number;
        message: string;
        data: (import("mongoose").Document<unknown, {}, import("../auth/schemas/user.schema").UserDocument> & import("../auth/schemas/user.schema").User & import("mongoose").Document<unknown, any, any> & Required<{
            _id: string;
        }>)[];
    }>;
    getFriendReqList(request: any): Promise<{
        statusCode: number;
        message: string;
        data: (import("mongoose").Document<unknown, {}, import("../auth/schemas/user.schema").UserDocument> & import("../auth/schemas/user.schema").User & import("mongoose").Document<unknown, any, any> & Required<{
            _id: string;
        }>)[];
    }>;
    getFriendsList(request: any): Promise<{
        statusCode: number;
        message: string;
        data: (import("mongoose").Document<unknown, {}, import("../auth/schemas/user.schema").UserDocument> & import("../auth/schemas/user.schema").User & import("mongoose").Document<unknown, any, any> & Required<{
            _id: string;
        }>)[];
    }>;
    getFriendProfile(friendId: string): Promise<{
        message: string;
        statusCode: number;
        data: {
            _id: string;
            username: string;
            email: string;
            phone: string;
            address: string;
        };
    }>;
    updateFriendStatus(request: any, userFollowDto: UserFollowDto): Promise<{
        message: string;
        statusCode: number;
    }>;
    blockUser(request: any, blockUserDto: BlockUserDto): Promise<{
        message: string;
        statusCode: number;
    }>;
    unBlockUser(request: any, blockUserDto: BlockUserDto): Promise<{
        message: string;
        statusCode: number;
    }>;
    muteUser(request: any, blockUserDto: BlockUserDto): Promise<{
        message: string;
        statusCode: number;
    }>;
    unMuteUser(request: any, blockUserDto: BlockUserDto): Promise<{
        message: string;
        statusCode: number;
    }>;
    blockList(request: any, blockUserDto: BlockUserDto): Promise<{
        statusCode: number;
        message: string;
        data: (import("mongoose").Document<unknown, {}, import("../auth/schemas/user.schema").UserDocument> & import("../auth/schemas/user.schema").User & import("mongoose").Document<unknown, any, any> & Required<{
            _id: string;
        }>)[];
    }>;
    searchFriends(request: any, searchFriendDto: SearchFriendDto): Promise<{
        statusCode: number;
        message: string;
        data: (import("mongoose").Document<unknown, {}, import("../auth/schemas/user.schema").UserDocument> & import("../auth/schemas/user.schema").User & import("mongoose").Document<unknown, any, any> & Required<{
            _id: string;
        }>)[];
    }>;
}
