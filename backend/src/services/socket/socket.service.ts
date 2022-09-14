import { Server } from 'http';
import { Server as SocketServer } from 'socket.io';

import { ChatMessageStatus, SocketEvent } from '~/common/enums/enums';
import {
  ChatMessageCreateRequestDto,
  ChatMessageGetAllItemResponseDto,
  SocketServer as SocketServerType,
} from '~/common/types/types';
import { chatMessage as chatMessageServ } from '~/services/services';
import { handlers as socketHandlers } from '~/socket/socket';

type Constructor = {
  chatMessageService: typeof chatMessageServ;
};

class Socket {
  #chatMessageService: typeof chatMessageServ;

  #io: SocketServerType | null = null;

  public constructor({ chatMessageService }: Constructor) {
    this.#chatMessageService = chatMessageService;
  }

  public initializeIo(server: Server): void {
    this.#io = new SocketServer(server, {
      cors: {
        origin: '*',
        credentials: true,
      },
    });
    (this.#io as SocketServerType).on(SocketEvent.CONNECTION, socketHandlers);
  }

  public async sendMessage(
    messageData: ChatMessageCreateRequestDto,
  ): Promise<ChatMessageGetAllItemResponseDto> {
    const { message, chatId, receiverId, senderId } = messageData;

    const areBothInChat = this.checkAreBothInChat(chatId as string);

    const newMessageStatus = areBothInChat
      ? ChatMessageStatus.READ
      : ChatMessageStatus.UNREAD;

    const newMessage = await this.#chatMessageService.create({
      chatId,
      message,
      receiverId,
      senderId,
      status: newMessageStatus,
    });

    (this.#io as SocketServerType)
      .to(chatId as string)
      .emit(SocketEvent.MESSAGE, newMessage);

    return newMessage;
  }

  public checkAreBothInChat(chatId: string): boolean {
    const numberOfUsersInChat = this.getNumberOfUsersInRoom(chatId);

    const MAX_PEOPLE_IN_CHAT = 2;

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
