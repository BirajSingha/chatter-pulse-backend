import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type FriendDocument = Friend & Document;

@Schema()
export class Friend {
  @Prop({ required: true })
  userId: string;

  @Prop({ required: true })
  friendId: string;

  @Prop({ required: true })
  status: string;

  @Prop({ required: true, default: false })
  isFollowing: boolean;

  @Prop({ required: true, default: false })
  isBlocked: boolean;

  @Prop({ required: true, default: false })
  isMuted: boolean;

  @Prop({ default: Date.now })
  createdAt: Date;

  @Prop({ default: Date.now })
  updatedAt: Date;
}

export const FriendSchema = SchemaFactory.createForClass(Friend);
