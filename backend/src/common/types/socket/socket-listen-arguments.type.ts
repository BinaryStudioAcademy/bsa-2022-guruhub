import { SocketEvent, SocketNamespace } from '~/common/enums/enums';

type SocketListenArguments<T> = {
  event: SocketEvent;
  callback: (arg: T) => void;
  namespace: SocketNamespace;
};

export { type SocketListenArguments };
