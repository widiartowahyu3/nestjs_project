// chat.gateway.ts
import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';

@WebSocketGateway()
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Server;

  handleConnection(client: Socket, ...args: any[]) {
    // Implement logic on connection
  }

  handleDisconnect(client: Socket) {
    // Implement logic on disconnection
  }

  @SubscribeMessage('message')
  handleMessage(
    client: Socket,
    payload: { sender: string; room: string; message: string },
  ) {
    // Implement logic to handle messages
    this.server.to(payload.room).emit('message', payload);
  }

  @SubscribeMessage('joinRoom')
  handleJoinRoom(client: Socket, room: string) {
    // Implement logic to join a room
    client.join(room);
  }

  @SubscribeMessage('leaveRoom')
  handleLeaveRoom(client: Socket, room: string) {
    // Implement logic to leave a room
    client.leave(room);
  }
}
