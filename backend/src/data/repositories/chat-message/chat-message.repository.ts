import { SortOrder } from '~/common/enums/enums';
import {
  ChatGetAllMessagesRequestDto,
  ChatGetLastMessagesRequestDto,
  ChatMessageCreateRequestDto,
  ChatMessageGetAllItemResponseDto,
  DeepNonNullable,
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
  }: DeepNonNullable<ChatMessageCreateRequestDto>): Promise<ChatMessageGetAllItemResponseDto> {
    return this.#ChatMessageModel
      .query()
      .insert({ senderId, receiverId, message, chatId: chatId as string })
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

  public getLastMessagesInChats(
    userId: number,
    menteesAndMentors: number[],
  ): Promise<ChatMessageM[]> {
    return this.#ChatMessageModel
      .query()
      .max('id as id')
      .where((builder) =>
        builder
          .where('receiverId', userId)
          .whereIn('senderId', menteesAndMentors),
      )
      .orWhere((builder) =>
        builder
          .where('senderId', userId)
          .whereIn('receiverId', menteesAndMentors),
      )
      .groupBy('chatId')
      .execute();
  }

  public getLastMessagesWithMentorsAndMentees(
    lastMessagesInChatsIds: number[],
  ): Promise<ChatMessageGetAllItemResponseDto[]> {
    return this.#ChatMessageModel
      .query()
      .select('chatMessages.id', 'message', 'createdAt', 'chatId')
      .whereIn('chatMessages.id', lastMessagesInChatsIds)
      .withGraphFetched(
        '[sender(withoutPassword).[userDetails], receiver(withoutPassword).[userDetails]]',
      )
      .castTo<ChatMessageGetAllItemResponseDto[]>()
      .execute();
  }
}

export { ChatMessage };
