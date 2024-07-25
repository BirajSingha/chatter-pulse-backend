export declare class AddFriendDto {
    readonly friendId: string;
}
export declare class DeleteFriendDto {
    readonly friendId: string;
}
export declare class UserFollowDto {
    readonly friendId: string;
    readonly isFollowing: boolean;
}
export declare class BlockUserDto {
    readonly friendId: string;
    readonly isBlocked: boolean;
}
export declare class SearchFriendDto {
    readonly query: string;
}
