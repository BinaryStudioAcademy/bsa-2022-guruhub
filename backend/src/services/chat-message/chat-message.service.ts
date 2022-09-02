import {
  ChatGetAllMessagesRequestDto,
  ChatMessageCreateRequestDto,
  ChatMessageGetAllItemResponseDto,
  ChatMessageGetAllLastResponseDto,
  ChatMessageGetAllResponseDto,
  IdContainer,
} from '~/common/types/types';
import {
  chatMessage as chatMessageRep,
  menteesToMentors as menteesToMentorsRep,
} from '~/data/repositories/repositories';
import { sanitizeHTML } from '~/helpers/helpers';
import { uuid as uuidServ } from '~/services/services';

type Constructor = {
  uuidService: typeof uuidServ;
  chatMessageRepository: typeof chatMessageRep;
  menteesToMentorsRepository: typeof menteesToMentorsRep;
};

class ChatMessage {
  #uuidService: typeof uuidServ;

  #chatMessageRepository: typeof chatMessageRep;

  #menteesToMentorsRepository: typeof menteesToMentorsRep;

  public constructor({
    uuidService,
    chatMessageRepository,
    menteesToMentorsRepository,
  }: Constructor) {
    this.#uuidService = uuidService;
    this.#chatMessageRepository = chatMessageRepository;
    this.#menteesToMentorsRepository = menteesToMentorsRepository;
  }

  public async getAll({
    chatId,
  }: ChatGetAllMessagesRequestDto): Promise<ChatMessageGetAllResponseDto> {
    const chatMessages = await this.#chatMessageRepository.getAll({
      chatId,
    });

    return { items: chatMessages, chatId };
  }

  public async getAllLastMessages(
    userId: number,
  ): Promise<ChatMessageGetAllLastResponseDto> {
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
    const { receiverId, senderId, message, chatId } = chatMessageCreateDto;

    return this.#chatMessageRepository.create({
      receiverId,
      senderId,
      message: sanitizeHTML(message),
      chatId: chatId ?? this.#uuidService.createUuid(),
    });
  }
}

export { ChatMessage };
