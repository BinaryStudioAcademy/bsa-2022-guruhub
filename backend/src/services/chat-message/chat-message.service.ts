import {
  ChatMessageCreateRequestDto,
  ChatMessageGetAllItemResponseDto,
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

  public getAll({
    senderId,
    receiverId,
  }: ChatMessageGetRequestDto): Promise<ChatMessageGetAllItemResponseDto[]> {
    return this.#chatMessageRepository.getAll({ senderId, receiverId });
  }

  public getLast({
    senderId,
    receiverId,
  }: ChatMessageGetRequestDto): Promise<ChatMessageGetAllItemResponseDto> {
    return this.#chatMessageRepository.getLast({ senderId, receiverId });
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
