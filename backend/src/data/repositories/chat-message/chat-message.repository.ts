import { SortOrder } from '~/common/enums/enums';
import {
  ChatMessageCreateRequestDto,
  ChatMessageGetAllItemResponseDto,
  ChatMessageGetRequestDto,
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
    senderId,
    receiverId,
  }: ChatMessageGetRequestDto): Promise<ChatMessageGetAllItemResponseDto[]> {
    return this.#ChatMessageModel
      .query()
      .select()
      .where({ senderId, receiverId })
      .orWhere({ senderId: receiverId, receiverId: senderId })
      .castTo<ChatMessageGetAllItemResponseDto[]>()
      .execute();
  }

  public getLast({
    senderId,
    receiverId,
  }: ChatMessageGetRequestDto): Promise<ChatMessageGetAllItemResponseDto> {
    return this.#ChatMessageModel
      .query()
      .select()
      .where({ senderId, receiverId })
      .orWhere({ senderId: receiverId, receiverId: senderId })
      .orderBy('createdAt', SortOrder.DESC)
      .first()
      .castTo<ChatMessageGetAllItemResponseDto>()
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
      .withGraphFetched('[sender, receiver]')
      .castTo<ChatMessageGetAllItemResponseDto>()
      .execute();
  }
}

export { ChatMessage };
