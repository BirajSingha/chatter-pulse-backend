import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
  _id: string;

  @Prop({ default: '' })
  username: string;

  @Prop({ required: true })
  fullname: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({
    required: true,
  })
  password: string;

  @Prop({
    required: true,
  })
  phone: string;

  @Prop({ default: '' })
  address: string;

  @Prop({ default: '' })
  profile_image: string;

  @Prop({ default: '' })
  bio: string;

  @Prop({ type: [String], default: [] })
  interests: string[];

  @Prop({ default: false })
  isVerified: boolean;

  @Prop({ default: '' })
  verificationCode?: string;

  @Prop({ default: '' })
  verificationCodeTimeStamp?: Date;

  @Prop({ default: Date.now })
  createdAt: Date;

  @Prop({ default: Date.now })
  updatedAt: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
