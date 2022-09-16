import { SocketEvent } from '~/common/enums/enums';

import { Socket } from './socket';

type SocketListenArguments<T> = {
  event: SocketEvent;
  callback: (socket: Socket, arg: T) => void;
};

export { type SocketListenArguments };
