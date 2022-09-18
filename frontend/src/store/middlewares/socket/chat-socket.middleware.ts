import { Middleware } from '@reduxjs/toolkit';
import { SocketEvent, SocketNamespace } from 'common/enums/enums';
import {
  AppDispatch,
  ChatMessageGetAllItemResponseDto,
} from 'common/types/types';
import { socket } from 'services/services';
import { chatsActions } from 'store/actions';

type SocketMiddlewareParams = {
  dispatch: AppDispatch;
};

const chatSocketInstance = socket.getInstance(SocketNamespace.CHAT);

const chatSocket: Middleware = ({ dispatch }: SocketMiddlewareParams) => {
  chatSocketInstance.on(
    SocketEvent.CHAT_ADD_MESSAGE,
    (message: ChatMessageGetAllItemResponseDto): void => {
      dispatch(chatsActions.addMessage(message));
      dispatch(chatsActions.readMessages(message.chatId));
    },
  );

  return (next) =>
    (action): void => {
      if (chatsActions.joinRoom.match(action)) {
        chatSocketInstance.emit(SocketEvent.CHAT_JOIN_ROOM, action.payload);
      }

      if (chatsActions.leaveRoom.match(action)) {
        chatSocketInstance.emit(SocketEvent.CHAT_LEAVE_ROOM, action.payload);
      }

      if (chatsActions.createMessage.fulfilled.match(action)) {
        chatSocketInstance.emit(
          SocketEvent.CHAT_CREATE_MESSAGE,
          action.payload,
        );
      }

      return next(action);
    };
};

export { chatSocket };
