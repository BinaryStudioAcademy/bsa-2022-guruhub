import { ChatMessageGetAllItemResponseDto } from '~/common/types/types';

type ChatMessageGetEmptyChatsRequestDto = {
  userId: number;
  fullName: string;
  lastMessagesInChats: ChatMessageGetAllItemResponseDto[];
};

export { type ChatMessageGetEmptyChatsRequestDto };
