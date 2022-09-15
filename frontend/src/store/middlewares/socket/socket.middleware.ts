import { Middleware } from '@reduxjs/toolkit';
import { SocketEvent } from 'common/enums/enums';
import {
  AppDispatch,
  ChatMessageGetAllItemResponseDto,
} from 'common/types/types';
import { socket as socketService } from 'services/services';
import { chatsActions } from 'store/actions';

type SocketMiddlewareParams = {
  dispatch: AppDispatch;
};

const socket: Middleware =
  ({ dispatch }: SocketMiddlewareParams) =>
  (next) =>
  (action): void => {
    const socketInstance = socketService.socket;

    const newMessageListener = (
      chatMessage: ChatMessageGetAllItemResponseDto,
    ): void => {
      dispatch(chatsActions.getNewMessage(chatMessage));
    };

    if (chatsActions.getMessages.pending.match(action)) {
      socketInstance.off(SocketEvent.MESSAGE);
    }

    if (chatsActions.getMessages.fulfilled.match(action)) {
      socketInstance.on(SocketEvent.MESSAGE, newMessageListener);
    }

    return next(action);
  };

export { socket };
