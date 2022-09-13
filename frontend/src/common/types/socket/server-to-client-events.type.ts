import { SocketEvent } from 'common/enums/enums';
import { SocketMessageEventDto } from 'common/types/types';

type ServerToClientEvents = {
  [SocketEvent.RECEIVE_MESSAGE]: ({
    message,
    roomId,
  }: SocketMessageEventDto) => void;
};

export { ServerToClientEvents };
