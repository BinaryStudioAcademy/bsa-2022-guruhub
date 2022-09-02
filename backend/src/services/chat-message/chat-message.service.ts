import {
  ChatMessageCreateRequestDto,
  ChatMessageFilteringDto,
  ChatMessageGetAllItemResponseDto,
  ChatMessageGetAllResponseDto,
  ChatMessageGetRequestDto,
} from '~/common/types/types';
import { ChatMessage as ChatMessageM } from '~/data/models/models';
import {
  chatMessage as chatMessageRep,
  menteesToMentors as menteesToMentorsRep,
} from '~/data/repositories/repositories';
import { sanitizeHTML } from '~/helpers/helpers';

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
    userId,
    chatOpponentId,
  }: ChatMessageGetRequestDto): Promise<ChatMessageGetAllResponseDto> {
    const chatMessages = await this.#chatMessageRepository.getAll({
      userId,
      chatOpponentId,
    });

    return { items: chatMessages };
  }

  public async getAllLastMessages(
    userId: number,
    filteringOpts: ChatMessageFilteringDto,
  ): Promise<ChatMessageGetAllItemResponseDto[]> {
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
      await this.#chatMessageRepository.getLastMessagesInChatsIds(
        userId,
        userMenteesOrMentorsIds,
      );

    const lastMessagesInChatsIds = lastMessagesInChats.map(
      (chatMessage: ChatMessageM) => chatMessage.id,
    );

    return this.#chatMessageRepository.getLastMessagesWithMentorsAndMentees(
      lastMessagesInChatsIds,
    );
  }

  public create(
    chatMessageCreateDto: ChatMessageCreateRequestDto,
  ): Promise<ChatMessageGetAllItemResponseDto> {
    const { receiverId, senderId, message } = chatMessageCreateDto;

    return this.#chatMessageRepository.create({
      receiverId,
      senderId,
      message: sanitizeHTML(message),
    });
  }
}

export { ChatMessage };
