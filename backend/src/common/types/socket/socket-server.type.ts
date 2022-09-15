import {
  ClientToServerEvents,
  ServerToClientEvents,
  SocketServer,
} from './socket';

type SocketServerType = SocketServer<
  ClientToServerEvents,
  ServerToClientEvents
>;

export { SocketServerType };
