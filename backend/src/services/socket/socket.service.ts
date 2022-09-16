import { Server as HttpServer } from 'http';
import { Server as SocketServer } from 'socket.io';

import { SocketEvent, SocketNamespace } from '~/common/enums/enums';
import {
  ChatMessageGetAllItemResponseDto,
  Socket as SocketType,
  SocketEmitArguments,
} from '~/common/types/types';

class Socket {
  #io: SocketServer | null = null;

  public initializeIo(server: HttpServer): void {
    this.#io = new SocketServer(server);
    (this.#io as SocketServer)
      .of(SocketNamespace.CHAT)
      .on(SocketEvent.CONNECTION, this.chatHandler);
  }

  public chatHandler(socket: SocketType): void {
    socket.on(SocketEvent.CHAT_JOIN_ROOM, (roomId: string) => {
      socket.join(roomId);
    });

    socket.on(SocketEvent.CHAT_LEAVE_ROOM, (roomId: string) => {
      socket.leave(roomId);
    });

    socket.on(
      SocketEvent.CHAT_CREATE_MESSAGE,
      (message: ChatMessageGetAllItemResponseDto) => {
        socket.broadcast
          .to(message.chatId)
          .emit(SocketEvent.CHAT_ADD_MESSAGE, message);
      },
    );
  }

  public emit<T>({ args, event, roomId }: SocketEmitArguments<T>): void {
    (this.#io as SocketServer).to(roomId).emit(event, args);
  }
}

export { Socket };
