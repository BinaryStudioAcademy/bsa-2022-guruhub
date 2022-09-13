import { SocketEvent } from '~/common/enums/enums';
import { Socket } from '~/common/types/types';

const handlers = (socket: Socket): void => {
  socket.on(SocketEvent.JOIN_ROOM, (roomId: string): void => {
    socket.join(roomId);
  });

  socket.on(SocketEvent.LEAVE_ROOM, (roomId: string): void => {
    socket.leave(roomId);
  });
};

export { handlers };
