import { ChatMessageStatus } from '~/common/enums/enums';

type ChatMessageCreateRequestDto = {
  receiverId: number;
  senderId: number;
  message: string;
  chatId: string | null;
  status: ChatMessageStatus;
};

export { type ChatMessageCreateRequestDto };
