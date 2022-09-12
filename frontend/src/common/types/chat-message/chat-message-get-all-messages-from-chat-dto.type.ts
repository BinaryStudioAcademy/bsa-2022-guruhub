import { ChatMessageUserResponseDto, UsersGetResponseDto } from '../types';

type ChatMessageGetAllMessagesFromChatDto = {
  id: string;
  chatOpponent: ChatMessageUserResponseDto | UsersGetResponseDto;
};
export { type ChatMessageGetAllMessagesFromChatDto };
