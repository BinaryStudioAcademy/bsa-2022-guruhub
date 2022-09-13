import {
  ClientToServerEvents,
  ServerToClientEvents,
  SocketServerType,
} from './socket';

type SocketServer = SocketServerType<
  ClientToServerEvents,
  ServerToClientEvents
>;

export { SocketServer };
