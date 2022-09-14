import {
  ChatMessageGetAllItemResponseDto,
  ChatMessageGetAllLastWithEmptyChatsDto,
} from '../types';

type ChatCreateMessageDto = {
  newMessage: ChatMessageGetAllItemResponseDto;
  lastMessages: ChatMessageGetAllLastWithEmptyChatsDto;
};

export { type ChatCreateMessageDto };
