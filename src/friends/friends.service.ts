import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Friend, FriendDocument } from './schemas/friends.schema';
import { User, UserDocument } from 'src/auth/schemas/user.schema';
import {
  AddFriendDto,
  BlockUserDto,
  DeleteFriendDto,
  SearchFriendDto,
  UserFollowDto,
} from './dto/friends.dto';

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

@Injectable()
export class FriendsService {
  constructor(
    @InjectModel(Friend.name) private friendModel: Model<FriendDocument>,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
  ) {}

  async addFriend(
    userId: string,
    addFriendDto: AddFriendDto,
  ): Promise<ReqResust> {
    const { friendId } = addFriendDto;

    const friendUser = await this.userModel.findById(friendId);
    if (!friendUser) {
      throw new NotFoundException('User not found!');
    }

    const existingFriend = await this.friendModel.findOne({ userId, friendId });
    if (existingFriend) {
      throw new BadRequestException('This user is already your friend');
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

  async deleteFriend(userId: string, deleteFriendDto: DeleteFriendDto) {
    const { friendId } = deleteFriendDto;
    const result = await this.friendModel.deleteOne({ userId, friendId });

    if (!result) {
      throw new NotFoundException('Friend not found!');
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

  async getFriendReqList(userId: string) {
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

    const users = await this.userModel.find(
      { _id: { $in: friendIds } },
      {
        password: 0,
        isVerified: 0,
        createdAt: 0,
        updatedAt: 0,
        verificationCode: 0,
        verificationCodeTimeStamp: 0,
        __v: 0,
      },
    );

    return {
      statusCode: 200,
      message: 'Friend requests fetched successfully!',
      data: users,
    };
  }

  async getFriendsList(userId: string) {
    const friendsRelationships = await this.friendModel.find({ userId });

    const friendsOnly = friendsRelationships.filter(
      (friend) => friend.status === 'Friends',
    );

    if (friendsOnly.length === 0) {
      return {
        statusCode: 200,
        message: 'No friends found for this user!',
        data: [],
      };
    }

    const friendIds = friendsOnly.map((friend) => friend.friendId);

    const friends = await this.userModel.find(
      { _id: { $in: friendIds } },
      {
        password: 0,
        isVerified: 0,
        createdAt: 0,
        updatedAt: 0,
        verificationCode: 0,
        verificationCodeTimeStamp: 0,
        __v: 0,
      },
    );

    return {
      statusCode: 200,
      message: 'Friends list fetched successfully!',
      data: friends,
    };
  }

  async getSuggestedFriends(userId: string) {
    const friends = await this.friendModel.find({ userId, status: 'Friends' });
    const friendIds = friends.map((friend) => friend.friendId);

    const exclusionIds = [userId, ...friendIds];

    const suggestedList = await this.userModel.find(
      { _id: { $nin: exclusionIds } },
      {
        password: 0,
        isVerified: 0,
        createdAt: 0,
        updatedAt: 0,
        verificationCode: 0,
        verificationCodeTimeStamp: 0,
        __v: 0,
      },
    );

    return {
      statusCode: 200,
      message: 'Suggested friends fetched successfully!',
      data: suggestedList,
    };
  }

  async getFriendProfile(friendId: string): Promise<Result> {
    const friend = await this.userModel.findOne({ _id: friendId });
    if (!friend) {
      throw new NotFoundException('User not found!');
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

  async updateFriendStatus(userId: string, userFollowDto: UserFollowDto) {
    const existingFriend = await this.friendModel.findOne({
      userId,
      friendId: userFollowDto.friendId,
    });

    if (!existingFriend) {
      throw new NotFoundException('Friend not found!');
    }

    existingFriend.isFollowing = userFollowDto.isFollowing;
    existingFriend.updatedAt = new Date();

    await existingFriend.save();

    return {
      message: 'Friend status updated successfully!',
      statusCode: 200,
    };
  }

  async blockUser(userId: string, blockUserDto: BlockUserDto) {
    const user = await this.friendModel.findById({
      userId,
    });

    if (!user) {
      throw new NotFoundException('User not found!');
    }

    const existingFriend = await this.friendModel.findOne({
      userId,
      friendId: blockUserDto.friendId,
    });

    if (!existingFriend) {
      throw new NotFoundException('Friend not found!');
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

  async blockList(userId: string, blockUserDto: BlockUserDto) {
    const user = await this.friendModel.findById({ userId });

    if (!user) {
      throw new NotFoundException('User not found!');
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
    const users = await this.userModel.find(
      { _id: { $in: friendIds } },
      {
        password: 0,
        isVerified: 0,
        createdAt: 0,
        updatedAt: 0,
        verificationCode: 0,
        verificationCodeTimeStamp: 0,
        __v: 0,
      },
    );

    return {
      statusCode: 200,
      message: 'Blocked users fetched successfully!',
      data: users,
    };
  }

  async unBlockUser(userId: string, blockUserDto: BlockUserDto) {
    const user = await this.friendModel.findById({
      userId,
    });

    if (!user) {
      throw new NotFoundException('User not found!');
    }

    const existingFriend = await this.friendModel.findOne({
      userId,
      friendId: blockUserDto.friendId,
    });

    if (!existingFriend) {
      throw new NotFoundException('Friend not found!');
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

  async muteUser(userId: string, blockUserDto: BlockUserDto) {
    const user = await this.friendModel.findById({
      userId,
    });

    if (!user) {
      throw new NotFoundException('User not found!');
    }

    const existingFriend = await this.friendModel.findOne({
      userId,
      friendId: blockUserDto.friendId,
    });

    if (!existingFriend) {
      throw new NotFoundException('Friend not found!');
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

  async unMuteUser(userId: string, blockUserDto: BlockUserDto) {
    const user = await this.friendModel.findById({
      userId,
    });

    if (!user) {
      throw new NotFoundException('User not found!');
    }

    const existingFriend = await this.friendModel.findOne({
      userId,
      friendId: blockUserDto.friendId,
    });

    if (!existingFriend) {
      throw new NotFoundException('Friend not found!');
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

  async searchFriends(userId: string, searchFriendDto: SearchFriendDto) {
    const searchTerm = new RegExp(searchFriendDto.query, 'i');
    const friendRelationships = await this.friendModel.find({
      userId,
      status: 'Friends',
    });

    if (!friendRelationships.length) {
      throw new NotFoundException('No friends found!');
    }

    const friendIds = friendRelationships.map((friend) => friend.friendId);

    const friends = await this.userModel.find(
      {
        _id: { $in: friendIds },
        username: { $regex: searchTerm },
      },
      {
        password: 0,
        isVerified: 0,
        createdAt: 0,
        updatedAt: 0,
        verificationCode: 0,
        verificationCodeTimeStamp: 0,
        __v: 0,
      },
    );

    return {
      statusCode: 200,
      message: 'Friends found successfully!',
      data: friends,
    };
  }
}
