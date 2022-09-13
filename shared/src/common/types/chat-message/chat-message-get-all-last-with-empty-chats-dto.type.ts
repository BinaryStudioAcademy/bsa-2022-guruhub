import { ChatMessageGetAllItemResponseDto } from './chat-message-get-all-item-response-dto.type';
import { ChatMessageGetEmptyChatDto } from './chat-message-get-empty-chat-dto.type';

type ChatMessageGetAllLastWithEmptyChatsDto = {
  emptyChats: ChatMessageGetEmptyChatDto[];
  items: ChatMessageGetAllItemResponseDto[];
};

export { type ChatMessageGetAllLastWithEmptyChatsDto };
