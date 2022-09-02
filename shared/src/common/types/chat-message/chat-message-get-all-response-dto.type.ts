import { ChatMessageGetAllItemResponseDto } from './chat-message-get-all-item-response-dto.type';

type ChatMessageGetAllResponseDto = {
  items: ChatMessageGetAllItemResponseDto[];
  chatId: string;
};

export { type ChatMessageGetAllResponseDto };
