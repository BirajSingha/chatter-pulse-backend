import { IsString, IsNotEmpty } from 'class-validator';

export class CreateMessageDto {
  @IsNotEmpty()
  @IsString()
  readonly roomId: string;

  @IsNotEmpty()
  @IsString()
  readonly sender: string;

  @IsNotEmpty()
  @IsString()
  readonly message: string;
}
