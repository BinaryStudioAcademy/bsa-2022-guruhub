import { ENV, SocketEvent } from 'common/enums/enums';
import {
  ClientToServerEvents,
  ServerToClientEvents,
  SocketMessageEventDto,
} from 'common/types/types';
import { io, Socket as SocketType } from 'socket.io-client';

type NewMessagesListener = ({ message, roomId }: SocketMessageEventDto) => void;

class Socket {
  #socket: SocketType<ServerToClientEvents, ClientToServerEvents>;

  public constructor() {
    this.#socket = io(ENV.SOCKET_URL);
  }

  public joinRoom(roomId: string): void {
    this.#socket.emit(SocketEvent.JOIN_ROOM, roomId);
  }

  public leaveRoom(roomId: string): void {
    this.#socket.emit(SocketEvent.LEAVE_ROOM, roomId);
  }

  public sendMessage({ message, roomId }: SocketMessageEventDto): void {
    this.#socket.emit(SocketEvent.SEND_MESSAGE, { message, roomId });
  }

  public listenToNewMessages(cb: NewMessagesListener): void {
    this.#socket.on(SocketEvent.RECEIVE_MESSAGE, cb);
  }

  public removeMessageListener(): void {
    this.#socket.off(SocketEvent.RECEIVE_MESSAGE);
  }
}

export { Socket };
