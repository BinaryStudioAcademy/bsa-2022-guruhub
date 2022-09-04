import { ChatMessageStatus, SortOrder } from '~/common/enums/enums';
import {
  ChatGetAllMessagesRequestDto,
  ChatGetLastMessagesRequestDto,
  ChatMessageCreateRequestWithStatusDto,
  ChatMessageGetAllItemResponseDto,
} from '~/common/types/types';
import { ChatMessage as ChatMessageM } from '~/data/models/models';

type Constructor = {
  ChatMessageModel: typeof ChatMessageM;
};

class ChatMessage {
  #ChatMessageModel: typeof ChatMessageM;

  public constructor({ ChatMessageModel }: Constructor) {
    this.#ChatMessageModel = ChatMessageModel;
  }

  public getAll({
    chatId,
  }: ChatGetAllMessagesRequestDto): Promise<
    ChatMessageGetAllItemResponseDto[]
  > {
    return this.#ChatMessageModel
      .query()
      .select()
      .where({ chatId })
      .withGraphJoined(
        '[sender(withoutPassword).[userDetails], receiver(withoutPassword).[userDetails]]',
      )
      .castTo<ChatMessageGetAllItemResponseDto[]>()
      .execute();
  }

  public create({
    senderId,
    receiverId,
    message,
    chatId,
    status,
  }: ChatMessageCreateRequestWithStatusDto): Promise<ChatMessageGetAllItemResponseDto> {
    return this.#ChatMessageModel
      .query()
      .insert({
        senderId,
        receiverId,
        message,
        chatId: chatId as string,
        status,
      })
      .withGraphFetched(
        '[sender(withoutPassword).[userDetails], receiver(withoutPassword).[userDetails]]',
      )
      .castTo<ChatMessageGetAllItemResponseDto>()
      .execute();
  }

  public getLastMessage({
    userId,
    chatOpponentId,
  }: ChatGetLastMessagesRequestDto): Promise<ChatMessageGetAllItemResponseDto> {
    return this.#ChatMessageModel
      .query()
      .select()
      .where({ senderId: userId, receiverId: chatOpponentId })
      .orWhere({ senderId: chatOpponentId, receiverId: userId })
      .orderBy('createdAt', SortOrder.DESC)
      .first()
      .withGraphJoined(
        '[sender(withoutPassword).[userDetails], receiver(withoutPassword).[userDetails]]',
      )
      .castTo<ChatMessageGetAllItemResponseDto>()
      .execute();
  }

  public async checkHasUnreadMessages(userId: number): Promise<boolean> {
    const hasUnreadMessages = await this.#ChatMessageModel
      .query()
      .select(1)
      .where({ receiverId: userId })
      .andWhere({ status: ChatMessageStatus.UNREAD })
      .first();

    return Boolean(hasUnreadMessages);
  }
}

export { ChatMessage };
