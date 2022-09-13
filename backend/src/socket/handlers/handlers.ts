import { SocketEvent } from '~/common/enums/enums';
import { Socket, SocketMessageEventDto } from '~/common/types/types';

const handlers = (socket: Socket): void => {
  socket.on(SocketEvent.JOIN_ROOM, (roomId: string): void => {
    socket.join(roomId);
  });

  socket.on(SocketEvent.LEAVE_ROOM, (roomId: string): void => {
    socket.leave(roomId);
  });

  socket.on(
    SocketEvent.SEND_MESSAGE,
    ({ message, roomId }: SocketMessageEventDto) => {
      socket.to(roomId).emit(message);
    },
  );
};

export { handlers };
