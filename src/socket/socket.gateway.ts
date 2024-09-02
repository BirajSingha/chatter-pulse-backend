import {
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { SocketService } from './socket.service';
import { CreateMessageDto } from './dto/chat.dto';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class SocketGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  private server: Server;

  constructor(private readonly chatService: SocketService) {}

  afterInit(server: Server) {
    console.log('WebSocket Server Initialized');
  }

  handleConnection(client: Socket) {
    console.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
  }

  @SubscribeMessage('joinRoom')
  handleJoinRoom(client: Socket, roomId: string) {
    client.join(roomId);
    console.log(`Client ${client.id} joined room ${roomId}`);
  }

  @SubscribeMessage('leaveRoom')
  handleLeaveRoom(client: Socket, roomId: string) {
    client.leave(roomId);
    console.log(`Client ${client.id} left room ${roomId}`);
  }

  @SubscribeMessage('sendMessage')
  async handleMessage(client: Socket, createMessageDto: CreateMessageDto) {
    const message = await this.chatService.createMessage(createMessageDto);
    this.server.to(createMessageDto.roomId).emit('send-message', message);
  }

  @SubscribeMessage('getMessages')
  async handleGetMessages(client: Socket, roomId: string) {
    const messages = await this.chatService.getMessagesByRoom(roomId);
    console.log('Messages:', messages);
    client.emit('get-messages', messages);
  }
}
