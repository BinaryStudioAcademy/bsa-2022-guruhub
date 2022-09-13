import { ChatMessageStatus } from '~/common/enums/enums';
import { UsersGetResponseDto } from '~/common/types/types';

type ChatMessageGetAllItemResponseDto = {
  id: number;
  receiver: UsersGetResponseDto;
  sender: UsersGetResponseDto;
  message: string;
  createdAt: string;
  chatId: string;
  status: ChatMessageStatus;
};

export { type ChatMessageGetAllItemResponseDto };
