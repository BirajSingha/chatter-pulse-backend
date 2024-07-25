import { IsString, IsNotEmpty, IsBoolean } from 'class-validator';

export class AddFriendDto {
  @IsString()
  @IsNotEmpty()
  readonly friendId: string;
}

export class DeleteFriendDto {
  @IsString()
  @IsNotEmpty()
  readonly friendId: string;
}

export class UserFollowDto {
  @IsString()
  @IsNotEmpty()
  readonly friendId: string;

  @IsBoolean()
  @IsNotEmpty()
  readonly isFollowing: boolean;
}

export class BlockUserDto {
  @IsString()
  @IsNotEmpty()
  readonly friendId: string;

  @IsBoolean()
  @IsNotEmpty()
  readonly isBlocked: boolean;
}

export class SearchFriendDto {
  @IsString()
  @IsNotEmpty()
  readonly query: string;
}
