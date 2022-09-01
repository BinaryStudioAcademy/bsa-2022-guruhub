import {
  ChatMessageCreateRequestDto,
  ChatMessageFilteringDto,
  ChatMessageGetAllItemResponseDto,
  ChatMessageGetAllResponseDto,
  ChatMessageGetRequestDto,
} from '~/common/types/types';
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
    const usersMentors =
      await this.#menteesToMentorsRepository.getMentorsByFullName(
        userId,
        fullName,
      );

    const userMentorsIds = usersMentors.map((mentor) => mentor.id);

    const usersMentees =
      await this.#menteesToMentorsRepository.getMenteesByFullName(
        userId,
        fullName,
      );
    const userMenteesIds = usersMentees.map((mentees) => mentees.id);

    const menteesAndMentors = [...userMentorsIds, ...userMenteesIds];

    const lastMessagesWithMentorsAndMentees =
      await this.#chatMessageRepository.getLastMessagesWithMentorsAndMentees(
        userId,
        menteesAndMentors,
      );

    return lastMessagesWithMentorsAndMentees;
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
