import { SocketNamespace } from 'common/enums/enums';
import { io, Socket as SocketClient } from 'socket.io-client';

class Socket {
  public getInstance(namespace: SocketNamespace): SocketClient {
    const socketInstance = io(namespace);

    return socketInstance;
  }
}

export { Socket };
