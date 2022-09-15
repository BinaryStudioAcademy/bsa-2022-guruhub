import { Server as HttpServer } from 'http';
import { Server as SocketServer } from 'socket.io';

import { SocketEvent } from '~/common/enums/enums';
import {
  Socket as SocketType,
  SocketEmitArguments,
  SocketServerType,
} from '~/common/types/types';

class Socket {
  #io: SocketServerType | null = null;

  private static NO_USERS_IN_ROOM = 0;

  public initializeIo(server: HttpServer): void {
    this.#io = new SocketServer(server, {
      cors: {
        origin: '*',
        credentials: true,
      },
    });
    (this.#io as SocketServerType).on(
      SocketEvent.CONNECTION,
      this.socketHandlers,
    );
  }

  public emit({ args, event, roomId }: SocketEmitArguments): void {
    (this.#io as SocketServerType).to(roomId).emit(event, args);
  }

  public getNumberOfUsersInRoom(roomId: string): number {
    const numberOfUsersInRoom = (
      this.#io as SocketServerType
    ).sockets.adapter.rooms.get(roomId)?.size;

    return numberOfUsersInRoom ?? Socket.NO_USERS_IN_ROOM;
  }

  private socketHandlers(socket: SocketType): void {
    socket.on(SocketEvent.JOIN_ROOM, (roomId: string) => {
      socket.join(roomId);
    });

    socket.on(SocketEvent.LEAVE_ROOM, (roomId: string) => {
      socket.leave(roomId);
    });
  }
}

export { Socket };
