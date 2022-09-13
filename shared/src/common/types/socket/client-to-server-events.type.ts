import { SocketEvent } from '~/common/enums/enums';

type ClientToServerEvents = {
  [SocketEvent.JOIN_ROOM]: (roomId: string) => void;
  [SocketEvent.LEAVE_ROOM]: (roomId: string) => void;
};

export { type ClientToServerEvents };
