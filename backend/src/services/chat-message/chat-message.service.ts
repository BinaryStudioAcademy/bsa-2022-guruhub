import {
  ChatMessageCreateRequestDto,
  ChatMessageGetAllItemResponseDto,
  ChatMessageGetAllResponseDto,
  ChatMessageGetRequestDto,
} from '~/common/types/types';
import { chatMessage as chatMessageRep } from '~/data/repositories/repositories';
import { sanitizeHTML } from '~/helpers/helpers';

type Constructor = {
  chatMessageRepository: typeof chatMessageRep;
};

class ChatMessage {
  #chatMessageRepository: typeof chatMessageRep;

  public constructor({ chatMessageRepository }: Constructor) {
    this.#chatMessageRepository = chatMessageRepository;
  }

  public getAllMessagesInChat({
    userId,
    chatOpponentId,
  }: ChatMessageGetRequestDto): Promise<ChatMessageGetAllItemResponseDto[]> {
    return this.#chatMessageRepository.getAllMessagesInChat({
      userId,
      chatOpponentId,
    });
  }

  public async getAllChatsLastMessages(
    userId: number,
  ): Promise<ChatMessageGetAllResponseDto> {
    const chatLastMessages =
      await this.#chatMessageRepository.getAllChatsLastMessages(userId);

    return { items: chatLastMessages };
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
