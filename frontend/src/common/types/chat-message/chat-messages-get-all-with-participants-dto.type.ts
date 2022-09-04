import {
  ChatMessageGetAllResponseDto,
  ChatParticipantsDto,
} from './chat-message';

type ChatMessagesGetAllWithParticipantsDto = ChatMessageGetAllResponseDto & {
  participants: ChatParticipantsDto | null;
};

export { type ChatMessagesGetAllWithParticipantsDto };
