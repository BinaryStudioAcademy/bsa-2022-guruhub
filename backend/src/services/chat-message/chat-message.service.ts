import {
  ChatMessageCreateRequestDto,
  ChatMessageGetAllItemResponseDto,
  ChatMessageGetAllResponseDto,
  ChatMessageGetRequestDto,
  IdContainer,
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
  ): Promise<ChatMessageGetAllResponseDto> {
    const usersMentorsDto: IdContainer[] =
      await this.#menteesToMentorsRepository.getMentors(userId);
    const usersMenteesDto: IdContainer[] =
      await this.#menteesToMentorsRepository.getMentees(userId);

    const chatOpponentsIds = [...usersMentorsDto, ...usersMenteesDto];

    const lastMessagesWithMentorsAndMentees = await Promise.all(
      chatOpponentsIds.map((chatOpponentIdConteiner) => {
        return this.#chatMessageRepository.getLastMessage({
          userId,
          chatOpponentId: chatOpponentIdConteiner.id,
        });
      }),
    );

    return { items: lastMessagesWithMentorsAndMentees };
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
