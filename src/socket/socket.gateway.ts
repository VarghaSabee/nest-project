import { ConnectedSocket, MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server, Socket, } from 'socket.io';
import { SocketService } from './socket.service';

@WebSocketGateway(8080, { namespace: 'event', cors: true })
export class SocketGateway {
  @WebSocketServer()
  server: Server;

  constructor(private readonly socketService: SocketService) { }


  onConnect(@ConnectedSocket() socket: Socket, @MessageBody() data: string) {
    // socket.emit('recive', data);
    console.info("Client connected");
  }


  @SubscribeMessage('event')
  listenForMessages(@ConnectedSocket() socket: Socket, @MessageBody() data: string) {
    socket.emit('recive', data);
  }
}
