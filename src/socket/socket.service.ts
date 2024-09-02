import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Chat, ChatDocument } from './schema/chat.schema';
import { Model } from 'mongoose';
import { CreateMessageDto } from './dto/chat.dto';

@Injectable()
export class SocketService {
  constructor(@InjectModel(Chat.name) private chatModel: Model<ChatDocument>) {}

  async createMessage(createMessageDto: CreateMessageDto): Promise<Chat> {
    const createdMessage = new this.chatModel(createMessageDto);
    return createdMessage.save();
  }

  async getMessagesByRoom(roomId: string): Promise<Chat[]> {
    return this.chatModel.find({ roomId }).exec();
  }
}
