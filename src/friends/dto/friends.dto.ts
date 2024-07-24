import { IsString, IsNotEmpty } from 'class-validator';

export class MyFriendsDto {
  @IsString()
  @IsNotEmpty()
  readonly friendId: string;

  @IsString()
  @IsNotEmpty()
  readonly userId: string;
}

export class AddFriendDto {
  @IsString()
  @IsNotEmpty()
  readonly friendId: string;

  @IsString()
  @IsNotEmpty()
  readonly userId: string;
}

export class DeleteFriendDto {
  @IsString()
  @IsNotEmpty()
  readonly friendId: string;

  @IsString()
  @IsNotEmpty()
  readonly userId: string;
}

export class SuggestedFriendsDto {
  @IsString()
  @IsNotEmpty()
  readonly userId: string;
}
