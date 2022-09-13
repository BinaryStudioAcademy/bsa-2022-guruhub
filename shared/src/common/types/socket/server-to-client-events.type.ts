import { SocketEvent } from '~/common/enums/enums';
import { ChatMessageGetAllItemResponseDto } from '~/common/types/types';

type ServerToClientEvents = {
  [SocketEvent.MESSAGE]: (
    messageData: ChatMessageGetAllItemResponseDto,
  ) => void;
};

export { ServerToClientEvents };
