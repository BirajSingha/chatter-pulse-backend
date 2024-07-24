import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type FriendDocument = Friend & Document;

@Schema()
export class Friend {
  @Prop({ required: true })
  userId: string;

  @Prop({ required: true })
  friendId: string;
}

export const FriendSchema = SchemaFactory.createForClass(Friend);
