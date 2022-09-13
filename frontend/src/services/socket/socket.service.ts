import { ENV, SocketEvent } from 'common/enums/enums';
import {
  ChatMessageGetAllItemResponseDto,
  ClientToServerEvents,
  ServerToClientEvents,
} from 'common/types/types';
import { io, Socket as SocketType } from 'socket.io-client';

type NewMessagesListener = (
  chatMessage: ChatMessageGetAllItemResponseDto,
) => void;

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

  public listenToNewMessages(cb: NewMessagesListener): void {
    this.#socket.on(SocketEvent.MESSAGE, cb);
  }

  public removeMessageListener(): void {
    this.#socket.off(SocketEvent.MESSAGE);
  }
}

export { Socket };
