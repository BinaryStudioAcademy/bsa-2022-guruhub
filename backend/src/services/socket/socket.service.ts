import { Server as HttpServer } from 'http';
import { Server as SocketServer } from 'socket.io';

import { SocketEvent } from '~/common/enums/enums';
import {
  ChatMessageGetAllItemResponseDto,
  Socket as SocketType,
  SocketServerType,
} from '~/common/types/types';

class Socket {
  #io: SocketServerType | null = null;

  private static MAX_PEOPLE_IN_CHAT = 2;

  private static NO_USERS_IN_CHAT = 0;

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

  public sendMessage(newMessage: ChatMessageGetAllItemResponseDto): void {
    const { chatId } = newMessage;

    (this.#io as SocketServerType)
      .to(chatId as string)
      .emit(SocketEvent.MESSAGE, newMessage);
  }

  public checkAreBothInChat(chatId: string): boolean {
    const numberOfUsersInChat = this.getNumberOfUsersInRoom(chatId);

    return numberOfUsersInChat === Socket.MAX_PEOPLE_IN_CHAT;
  }

  public getNumberOfUsersInRoom(chatId: string): number {
    const numberOfUsersInRoom = (
      this.#io as SocketServerType
    ).sockets.adapter.rooms.get(chatId)?.size;

    return numberOfUsersInRoom ?? Socket.NO_USERS_IN_CHAT;
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
