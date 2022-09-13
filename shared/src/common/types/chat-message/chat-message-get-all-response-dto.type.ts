import { UsersGetResponseDto } from '~/common/types/types';

import { ChatMessageGetAllItemResponseDto } from './chat-message-get-all-item-response-dto.type';

type ChatMessageGetAllResponseDto = {
  items: ChatMessageGetAllItemResponseDto[];
  chatId: string;
  chatOpponent: UsersGetResponseDto;
};

export { type ChatMessageGetAllResponseDto };
