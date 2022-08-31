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
    const chatLastMessages =
      await this.#chatMessageRepository.getAllLastMessages(userId);

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
