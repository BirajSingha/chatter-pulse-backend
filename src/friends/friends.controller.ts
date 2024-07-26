import {
  Controller,
  Get,
  Post,
  Delete,
  Param,
  Body,
  Request,
  HttpCode,
  UseGuards,
  Put,
} from '@nestjs/common';
import { FriendsService } from './friends.service';
import {
  AddFriendDto,
  BlockUserDto,
  DeleteFriendDto,
  MuteUserDto,
  SearchFriendDto,
  UserFollowDto,
} from './dto/friends.dto';
import { AuthGaurd } from 'src/auth/gaurds/auth.gaurd';

@Controller('friends')
export class FriendsController {
  constructor(private readonly friendsService: FriendsService) {}

  @HttpCode(201)
  @UseGuards(AuthGaurd)
  @Post('add-friend')
  async addFriend(@Request() request, @Body() addFriendDto: AddFriendDto) {
    return this.friendsService.addFriend(request.user._id, addFriendDto);
  }

  @HttpCode(200)
  @UseGuards(AuthGaurd)
  @Post('remove-friend')
  async deleteFriend(
    @Request() request,
    @Body() deleteFriendDto: DeleteFriendDto,
  ) {
    return this.friendsService.deleteFriend(request.user._id, deleteFriendDto);
  }

  @HttpCode(200)
  @UseGuards(AuthGaurd)
  @Get('suggested')
  async getSuggestedFriends(@Request() request) {
    return this.friendsService.getSuggestedFriends(request.user._id);
  }

  @HttpCode(200)
  @UseGuards(AuthGaurd)
  @Get('friend-requests')
  async getFriendReqList(@Request() request) {
    return this.friendsService.getFriendReqList(request.user._id);
  }

  @HttpCode(200)
  @UseGuards(AuthGaurd)
  @Get('list')
  async getFriendsList(@Request() request) {
    return this.friendsService.getFriendsList(request.user._id);
  }

  @HttpCode(200)
  @UseGuards(AuthGaurd)
  @Get('profile/:friendId')
  async getFriendProfile(@Param('friendId') friendId: string) {
    return this.friendsService.getFriendProfile(friendId);
  }

  @HttpCode(200)
  @UseGuards(AuthGaurd)
  @Put('follow')
  async updateFriendStatus(
    @Request() request,
    @Body() userFollowDto: UserFollowDto,
  ) {
    return this.friendsService.updateFriendStatus(
      request.user._id,
      userFollowDto,
    );
  }

  @HttpCode(200)
  @UseGuards(AuthGaurd)
  @Put('block')
  async blockUser(@Request() request, @Body() blockUserDto: BlockUserDto) {
    return this.friendsService.blockUser(request.user._id, blockUserDto);
  }

  @HttpCode(200)
  @UseGuards(AuthGaurd)
  @Put('mute')
  async muteUser(@Request() request, @Body() muteUserDto: MuteUserDto) {
    return this.friendsService.muteUser(request.user._id, muteUserDto);
  }

  @HttpCode(200)
  @UseGuards(AuthGaurd)
  @Put('block-list')
  async blockList(@Request() request) {
    return this.friendsService.blockList(request.user._id);
  }

  @HttpCode(200)
  @UseGuards(AuthGaurd)
  @Post('friend-search')
  async searchFriends(
    @Request() request,
    @Body() searchFriendDto: SearchFriendDto,
  ) {
    return this.friendsService.searchFriends(request.user._id, searchFriendDto);
  }
}
