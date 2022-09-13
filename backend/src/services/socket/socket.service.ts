import { ChatMessageStatus, SocketEvent } from '~/common/enums/enums';
import {
  ChatMessageCreateRequestDto,
  ChatMessageGetAllItemResponseDto,
  SocketServer,
} from '~/common/types/types';
import { chatMessage as chatMessageServ } from '~/services/services';

type Constructor = {
  chatMessageService: typeof chatMessageServ;
};

class Socket {
  #chatMessageService: typeof chatMessageServ;

  public constructor({ chatMessageService }: Constructor) {
    this.#chatMessageService = chatMessageService;
  }

  public async sendMessage({
    io,
    messageData,
  }: {
    io: SocketServer;
    messageData: ChatMessageCreateRequestDto;
  }): Promise<ChatMessageGetAllItemResponseDto> {
    const { message, chatId, receiverId, senderId } = messageData;

    const areBothInChat = this.checkAreBothInChat(io, chatId as string);

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

    io.to(chatId as string).emit(SocketEvent.MESSAGE, newMessage);

    return newMessage;
  }

  public checkAreBothInChat(io: SocketServer, chatId: string): boolean {
    const numberOfUsersInChat = this.getNumberOfUsersInRoom(io, chatId);

    const MAX_PEOPLE_IN_CHAT = 2;

    return numberOfUsersInChat === MAX_PEOPLE_IN_CHAT;
  }

  public getNumberOfUsersInRoom(io: SocketServer, chatId: string): number {
    const numberOfUsersInRoom = (
      io.sockets.adapter.rooms.get(chatId) as Set<string>
    ).size;

    return numberOfUsersInRoom;
  }
}

export { Socket };
