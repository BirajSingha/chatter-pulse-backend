import { Document } from 'mongoose';
export type FriendDocument = Friend & Document;
export declare class Friend {
    userId: string;
    friendId: string;
    status: string;
    isFollowing: boolean;
    isBlocked: boolean;
    isMuted: boolean;
    createdAt: Date;
    updatedAt: Date;
}
export declare const FriendSchema: import("mongoose").Schema<Friend, import("mongoose").Model<Friend, any, any, any, Document<unknown, any, Friend> & Friend & {
    _id: import("mongoose").Types.ObjectId;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Friend, Document<unknown, {}, import("mongoose").FlatRecord<Friend>> & import("mongoose").FlatRecord<Friend> & {
    _id: import("mongoose").Types.ObjectId;
}>;
