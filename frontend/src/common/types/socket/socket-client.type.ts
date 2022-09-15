import { ClientToServerEvents, ServerToClientEvents, Socket } from './socket';

type SocketClient = Socket<ServerToClientEvents, ClientToServerEvents>;

export { type SocketClient };
