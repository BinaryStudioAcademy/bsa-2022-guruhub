import { SocketEvent } from 'common/enums/enums';
import { SocketMessageEventDto } from 'common/types/types';

type ClientToServerEvents = {
  [SocketEvent.SEND_MESSAGE]: ({
    message,
    roomId,
  }: SocketMessageEventDto) => void;

  [SocketEvent.JOIN_ROOM]: (roomId: string) => void;

  [SocketEvent.LEAVE_ROOM]: (roomId: string) => void;
};

export { type ClientToServerEvents };
