import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Friend, FriendDocument } from './schemas/friends.schema';
import { User, UserDocument } from 'src/auth/schemas/user.schema';
import {
  AddFriendDto,
  DeleteFriendDto,
  MyFriendsDto,
  SuggestedFriendsDto,
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

@Injectable()
export class FriendsService {
  constructor(
    @InjectModel(Friend.name) private friendModel: Model<FriendDocument>,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
  ) {}

  async addFriend(addFriendDto: AddFriendDto): Promise<Friend> {
    const newFriend = new this.friendModel(addFriendDto);
    return newFriend.save();
  }

  async deleteFriend(deleteFriendDto: DeleteFriendDto): Promise<void> {
    const { userId, friendId } = deleteFriendDto;
    const result = await this.friendModel
      .deleteOne({ userId, friendId })
      .exec();
    if (result.deletedCount === 0) {
      throw new NotFoundException('Friend not found');
    }
  }

  async getFriendsList(myFriendsDto: MyFriendsDto): Promise<Friend[]> {
    const { userId } = myFriendsDto;
    return this.friendModel.find({ userId }).exec();
  }

  async getSuggestedFriends(suggestedFriendsDto: SuggestedFriendsDto) {
    const { userId } = suggestedFriendsDto;
    const friends = await this.friendModel.find({ userId }).exec();
    const friendIds = friends.map((friend) => friend.friendId);

    const suggestedFriends = await this.friendModel
      .find({
        userId: { $ne: userId },
        _id: { $nin: friendIds },
      })
      .exec();

    return {
      statusCode: 200,
      message: 'Suggested friends fetched successfully!',
      data: suggestedFriends,
    };
  }

  async getFriendProfile(friendId: string): Promise<Result> {
    const friend = await this.userModel.findOne({ _id: friendId }).exec();
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
}
