import { ChatMessageUserResponseDto } from './chat-message';
import { ChatMessageGetAllItemResponseDto } from './chat-message-get-all-item-response-dto.type';

type ChatMessageGetAllResponseDto = {
  items: ChatMessageGetAllItemResponseDto[];
  chatId: string;
  chatOpponent: ChatMessageUserResponseDto;
};

export { type ChatMessageGetAllResponseDto };
