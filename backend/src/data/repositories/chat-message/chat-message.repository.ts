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

  #MenteesToMentors: typeof MenteesToMentorsM;

  public constructor({ ChatMessageModel, MenteesToMentors }: Constructor) {
    this.#ChatMessageModel = ChatMessageModel;
    this.#MenteesToMentors = MenteesToMentors;
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

  public async getAllLastMessages(
    userId: number,
  ): Promise<ChatMessageGetAllItemResponseDto[]> {
    const usersMentors = await this.#MenteesToMentors
      .query()
      .select()
      .where({ menteeId: userId })
      .returning('mentees_to_mentors.mentor_id')
      .castTo<Array<number>>()
      .execute();
    const usersMentees = await this.#MenteesToMentors
      .query()
      .select()
      .where({ mentorId: userId })
      .returning('mentees_to_mentors.mentee_id')
      .castTo<Array<number>>()
      .execute();

    const chatOpponentsIds = [...usersMentors, ...usersMentees];

    const lastMessagesWithMentorsAndMentees = Promise.all(
      chatOpponentsIds.map((chatOpponentId) => {
        return this.getLastMessage({
          userId,
          chatOpponentId: chatOpponentId as number,
        });
      }),
    );

    return lastMessagesWithMentorsAndMentees;
  }

  private getLastMessage({
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
