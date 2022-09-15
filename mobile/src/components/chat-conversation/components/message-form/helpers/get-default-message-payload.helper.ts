import { ChatMessageFormRequestDto } from '~/common/types/types';

const getDefaultMessagePayload = (): ChatMessageFormRequestDto => ({
  message: '',
});

export { getDefaultMessagePayload };
