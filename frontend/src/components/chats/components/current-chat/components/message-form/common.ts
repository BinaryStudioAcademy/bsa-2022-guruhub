import { ChatMessageCreateRequestBodyDto } from 'common/types/types';

const getDefaultMessagePayload = (
  receiverId: number,
  chatId: string | null,
): ChatMessageCreateRequestBodyDto => ({
  message: '',
  receiverId,
  chatId,
});

export { getDefaultMessagePayload };
