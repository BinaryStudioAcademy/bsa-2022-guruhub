import { ENV, SocketEvent } from 'common/enums/enums';
import { SocketClient } from 'common/types/types';
import { io } from 'socket.io-client';

class Socket {
  #socket: SocketClient;

  public constructor() {
    this.#socket = io(ENV.SOCKET_URL);
  }

  public joinRoom(roomId: string): void {
    this.#socket.emit(SocketEvent.JOIN_ROOM, roomId);
  }

  public leaveRoom(roomId: string): void {
    this.#socket.emit(SocketEvent.LEAVE_ROOM, roomId);
  }

  public get socket(): SocketClient {
    return this.#socket;
  }
}

export { Socket };
