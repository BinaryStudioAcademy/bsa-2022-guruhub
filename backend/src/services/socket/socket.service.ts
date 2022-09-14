import { Server as HttpServer } from 'http';
import { Server as SocketServer } from 'socket.io';

import { SocketEvent } from '~/common/enums/enums';
import {
  ChatMessageGetAllItemResponseDto,
  SocketServer as SocketServerType,
} from '~/common/types/types';
import { handlers as socketHandlers } from '~/socket/socket';

const MAX_PEOPLE_IN_CHAT = 2;

class Socket {
  #io: SocketServerType | null = null;

  public initializeIo(server: HttpServer): void {
    this.#io = new SocketServer(server, {
      cors: {
        origin: '*',
        credentials: true,
      },
    });
    (this.#io as SocketServerType).on(SocketEvent.CONNECTION, socketHandlers);
  }

  public sendMessage(newMessage: ChatMessageGetAllItemResponseDto): void {
    const { chatId } = newMessage;

    (this.#io as SocketServerType)
      .to(chatId as string)
      .emit(SocketEvent.MESSAGE, newMessage);
  }

  public checkAreBothInChat(chatId: string): boolean {
    const numberOfUsersInChat = this.getNumberOfUsersInRoom(chatId);

    return numberOfUsersInChat === MAX_PEOPLE_IN_CHAT;
  }

  public getNumberOfUsersInRoom(chatId: string): number {
    const numberOfUsersInRoom = (
      this.#io as SocketServerType
    ).sockets.adapter.rooms.get(chatId)?.size;

    return numberOfUsersInRoom ?? 0;
  }
}

export { Socket };
