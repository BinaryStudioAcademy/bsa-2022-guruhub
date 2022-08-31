import { ChatMessageUserResponseDto } from './chat-message-user-response-dto-type';

type ChatMessageGetAllItemResponseDto = {
  id: number;
  toUserId: ChatMessageUserResponseDto;
  fromUserId: ChatMessageUserResponseDto;
  text: string;
  createdAt: string;
};

export { type ChatMessageGetAllItemResponseDto };
