import { SortOrder } from '~/common/enums/enums';
import {
  ChatMessageCreateRequestDto,
  ChatMessageGetAllItemResponseDto,
  ChatMessageGetRequestDto,
} from '~/common/types/types';
import {
  ChatMessage as ChatMessageM,
  MenteesToMentors as MenteesToMentorsM,
} from '~/data/models/models';

type Constructor = {
  ChatMessageModel: typeof ChatMessageM;
  MenteesToMentors: typeof MenteesToMentorsM;
};

class ChatMessage {
  #ChatMessageModel: typeof ChatMessageM;

  #MenteesToMentorsModel: typeof MenteesToMentorsM;

  public constructor({ ChatMessageModel, MenteesToMentors }: Constructor) {
    this.#ChatMessageModel = ChatMessageModel;
    this.#MenteesToMentorsModel = MenteesToMentors;
  }

  public getAll({
    userId,
    chatOpponentId,
  }: ChatMessageGetRequestDto): Promise<ChatMessageGetAllItemResponseDto[]> {
    return this.#ChatMessageModel
      .query()
      .select()
      .where({ senderId: userId, receiverId: chatOpponentId })
      .orWhere({ senderId: chatOpponentId, receiverId: userId })
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
  }: ChatMessageCreateRequestDto): Promise<ChatMessageGetAllItemResponseDto> {
    return this.#ChatMessageModel
      .query()
      .insert({ senderId, receiverId, message })
      .withGraphFetched(
        '[sender(withoutPassword).[userDetails], receiver(withoutPassword).[userDetails]]',
      )
      .castTo<ChatMessageGetAllItemResponseDto>()
      .execute();
  }

  public getLastMessage({
    userId,
    chatOpponentId,
  }: ChatMessageGetRequestDto): Promise<ChatMessageGetAllItemResponseDto> {
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
}

export { ChatMessage };
