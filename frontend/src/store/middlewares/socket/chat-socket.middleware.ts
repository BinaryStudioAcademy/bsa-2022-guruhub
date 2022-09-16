import { Middleware } from '@reduxjs/toolkit';
import { ENV, SocketEvent, SocketNamespace } from 'common/enums/enums';
import {
  AppDispatch,
  ChatMessageGetAllItemResponseDto,
} from 'common/types/types';
import { io } from 'socket.io-client';
import { chatsActions } from 'store/actions';

type SocketMiddlewareParams = {
  dispatch: AppDispatch;
};

const chatSocketInstance = io(`${ENV.SOCKET_SERVER}${SocketNamespace.CHAT}`, {
  reconnection: true,
});

const chatSocket: Middleware =
  ({ dispatch }: SocketMiddlewareParams) =>
  (next) =>
  (action): void => {
    if (chatsActions.joinRoom.match(action)) {
      chatSocketInstance.emit(SocketEvent.CHAT_JOIN_ROOM, action.payload);
      chatSocketInstance.on(
        SocketEvent.CHAT_ADD_MESSAGE,
        (message: ChatMessageGetAllItemResponseDto): void => {
          dispatch(chatsActions.addMessage(message));
          // PR Read Messages should be Merged
          // dispatch(chatsActions.readMessages(message.chatId));
        },
      );
    }

    if (chatsActions.leaveRoom.match(action)) {
      chatSocketInstance.emit(SocketEvent.CHAT_LEAVE_ROOM, action.payload);
      chatSocketInstance.off(SocketEvent.CHAT_ADD_MESSAGE);
    }

    if (chatsActions.createMessage.match(action)) {
      chatSocketInstance.emit(SocketEvent.CHAT_CREATE_MESSAGE, action.payload);
    }

    return next(action);
  };

export { chatSocket };
