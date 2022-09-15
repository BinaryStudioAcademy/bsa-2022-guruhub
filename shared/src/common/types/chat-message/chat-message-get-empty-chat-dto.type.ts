import { UsersGetResponseDto } from '~/common/types/types';

type ChatMessageGetEmptyChatDto = {
  receiver: UsersGetResponseDto;
  chatId: string;
};

export { type ChatMessageGetEmptyChatDto };
