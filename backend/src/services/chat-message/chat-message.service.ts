import {
  ChatGetAllMessagesRequestDto,
  ChatMessageCreateRequestDto,
  ChatMessageFilteringDto,
  ChatMessageGetAllItemResponseDto,
  ChatMessageGetAllLastResponseDto,
} from '~/common/types/types';
import { ChatMessage as ChatMessageM } from '~/data/models/models';
import {
  chatMessage as chatMessageRep,
  menteesToMentors as menteesToMentorsRep,
} from '~/data/repositories/repositories';
import { createUuid, sanitizeHTML } from '~/helpers/helpers';

type Constructor = {
  chatMessageRepository: typeof chatMessageRep;
  menteesToMentorsRepository: typeof menteesToMentorsRep;
};

class ChatMessage {
  #chatMessageRepository: typeof chatMessageRep;

  #menteesToMentorsRepository: typeof menteesToMentorsRep;

  public constructor({
    chatMessageRepository,
    menteesToMentorsRepository,
  }: Constructor) {
    this.#chatMessageRepository = chatMessageRepository;
    this.#menteesToMentorsRepository = menteesToMentorsRepository;
  }

  public async getAll({
    chatId,
  }: ChatGetAllMessagesRequestDto): Promise<ChatMessageGetAllLastResponseDto> {
    const chatMessages = await this.#chatMessageRepository.getAll({
      chatId,
    });

    return { items: chatMessages };
  }

  public async getAllLastMessages(
    userId: number,
    filteringOpts: ChatMessageFilteringDto,
  ): Promise<ChatMessageGetAllLastResponseDto> {
    const { fullName } = filteringOpts;

    const userMenteesOrMentors =
      await this.#menteesToMentorsRepository.getMenteesOrMentorsByFullName(
        userId,
        fullName ?? '',
      );

    const userMenteesOrMentorsIds = userMenteesOrMentors.map(
      (menteesOrMentors) => {
        return menteesOrMentors.menteeId === userId
          ? menteesOrMentors.mentorId
          : menteesOrMentors.menteeId;
      },
    );

    const lastMessagesInChats =
      await this.#chatMessageRepository.getLastMessagesInChats(
        userId,
        userMenteesOrMentorsIds,
      );

    const lastMessagesInChatsIds = lastMessagesInChats.map(
      (chatMessage: ChatMessageM) => chatMessage.id,
    );

    const lastMessagesWithMentorsAndMentees =
      await this.#chatMessageRepository.getLastMessagesWithMentorsAndMentees(
        lastMessagesInChatsIds,
      );

    return {
      items: lastMessagesWithMentorsAndMentees,
    };
  }

  public create(
    chatMessageCreateDto: ChatMessageCreateRequestDto,
  ): Promise<ChatMessageGetAllItemResponseDto> {
    const { receiverId, senderId, message, chatId } = chatMessageCreateDto;

    return this.#chatMessageRepository.create({
      receiverId,
      senderId,
      message: sanitizeHTML(message),
      chatId: chatId ?? createUuid(),
    });
  }
}

export { ChatMessage };
