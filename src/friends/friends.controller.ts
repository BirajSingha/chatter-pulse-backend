import { Controller, Get, Post, Delete, Param, Body } from '@nestjs/common';
import { FriendsService } from './friends.service';
import {
  AddFriendDto,
  DeleteFriendDto,
  MyFriendsDto,
  SuggestedFriendsDto,
} from './dto/friends.dto';
import { Friend } from './schemas/friends.schema';
import { User } from 'src/auth/schemas/user.schema';

@Controller('friends')
export class FriendsController {
  constructor(private readonly friendsService: FriendsService) {}

  @Post('add')
  async addFriend(@Body() addFriendDto: AddFriendDto): Promise<Friend> {
    return this.friendsService.addFriend(addFriendDto);
  }

  @Delete('delete')
  async deleteFriend(@Body() deleteFriendDto: DeleteFriendDto): Promise<void> {
    return this.friendsService.deleteFriend(deleteFriendDto);
  }

  @Get('suggested')
  async getSuggestedFriends(@Body() suggestedFriendsDto: SuggestedFriendsDto) {
    return this.friendsService.getSuggestedFriends(suggestedFriendsDto);
  }

  @Get('list')
  async getFriendsList(@Body() myFriendsDto: MyFriendsDto): Promise<Friend[]> {
    return this.friendsService.getFriendsList(myFriendsDto);
  }

  @Get('profile/:friendId')
  async getFriendProfile(@Param('friendId') friendId: string) {
    return this.friendsService.getFriendProfile(friendId);
  }
}
