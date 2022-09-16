import { SocketEvent } from '~/common/enums/enums';

type SocketEmitArguments<T> = {
  event: SocketEvent;
  args: T;
  roomId: string;
};

export { type SocketEmitArguments };
