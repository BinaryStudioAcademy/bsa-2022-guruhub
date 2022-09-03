import {
  ChatGetAllMessagesRequestDto,
  ChatMessageCreateRequestDto,
  ChatMessageFilteringDto,
  ChatMessageGetAllItemResponseDto,
  ChatMessageGetAllResponseDto,
} from '~/common/types/types';
import { ChatMessage as ChatMessageM } from '~/data/models/models';
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
