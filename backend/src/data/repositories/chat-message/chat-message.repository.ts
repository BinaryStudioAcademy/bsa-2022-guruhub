import { SortOrder } from '~/common/enums/enums';
import {
  ChatMessageCreateRequestDto,
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

  public getAll(
    senderId: number,
    receiverId: number,
  ): Promise<ChatMessageGetAllItemResponseDto[]> {
    return this.#ChatMessageModel
      .query()
      .select()
      .where({ senderId })
      .andWhere({ receiverId })
      .castTo<ChatMessageGetAllItemResponseDto[]>()
      .execute();
  }

  public getLast(
    senderId: number,
    receiverId: number,
  ): Promise<ChatMessageGetAllItemResponseDto> {
    return this.#ChatMessageModel
      .query()
      .select()
      .where({ senderId })
      .andWhere({ receiverId })
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
