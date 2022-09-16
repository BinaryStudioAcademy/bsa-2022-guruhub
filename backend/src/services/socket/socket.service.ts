import { Server as HttpServer } from 'http';
import { Server as SocketServer } from 'socket.io';

import { SocketEvent, SocketNamespace } from '~/common/enums/enums';
import {
  Socket as SocketType,
  SocketEmitArguments,
  SocketListenArguments,
} from '~/common/types/types';

class Socket {
  #io: SocketServer | null = null;

  public initializeIo(server: HttpServer): void {
    this.#io = new SocketServer(server, {
      cors: {
        origin: '*',
        credentials: true,
      },
    });
    (this.#io as SocketServer)
      .of(SocketNamespace.CHAT)
      .on(SocketEvent.CONNECTION, this.chatHandler);
  }

  private chatHandler(socket: SocketType): void {
    // socket.on('*', (event, data) => {
    //   console.log('###############################################');

    //   console.log(event);
    //   console.log(data);
    // });

    socket.on(SocketEvent.CHAT_JOIN_ROOM, (roomId: string) => {
      socket.join(roomId);
    });

    socket.on(SocketEvent.CHAT_LEAVE_ROOM, (roomId: string) => {
      socket.leave(roomId);
    });
  }

  public emit<T>({ args, event, roomId }: SocketEmitArguments<T>): void {
    (this.#io as SocketServer).to(roomId).emit(event, args);
  }

  public broadcast<T>(
    socket: SocketType,
    { args, event, roomId }: SocketEmitArguments<T>,
  ): void {
    socket.broadcast.to(roomId).emit(event, args);
  }

  public listen<T>({ callback, event }: SocketListenArguments<T>): void {
    (this.#io as SocketServer).on(event, callback);
  }
}

export { Socket };
