import { ChatMessageUserResponseDto } from './chat-message-user-response-dto-type';

type ChatMessageGetAllItemResponseDto = {
  id: number;
  receiver: ChatMessageUserResponseDto;
  sender: ChatMessageUserResponseDto;
  message: string;
  createdAt: string;
};

export { type ChatMessageGetAllItemResponseDto };
