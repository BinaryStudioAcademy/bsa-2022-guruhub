import { ChatMessageStatus } from '~/common/enums/enums';

import { ChatMessageCreateRequestDto } from './chat-message-create-request-dto.type';

type ChatMessageCreateRequestWithStatusDto = ChatMessageCreateRequestDto & {
  status: ChatMessageStatus;
};

export { type ChatMessageCreateRequestWithStatusDto };
