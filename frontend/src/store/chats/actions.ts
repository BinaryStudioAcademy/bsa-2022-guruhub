import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import {
  AsyncThunkConfig,
  ChatMessageCreateRequestBodyDto,
  ChatMessageFilteringDto,
  ChatMessageGetAllItemResponseDto,
  ChatMessageGetAllLastWithEmptyChatsDto,
  ChatMessageGetAllMessagesFromChatDto,
  ChatMessageGetAllResponseDto,
} from 'common/types/types';

import { ActionType } from './common';

const getLastMessages = createAsyncThunk<
  ChatMessageGetAllLastWithEmptyChatsDto,
  ChatMessageFilteringDto,
  AsyncThunkConfig
>(ActionType.GET_LAST_MESSAGES, async ({ fullName }, { extra }) => {
  const { chatsApi } = extra;
  const lastMessages = await chatsApi.getAllChatsLastMessages({
    filtering: { fullName },
  });

  return lastMessages;
});

const getMessages = createAsyncThunk<
  ChatMessageGetAllResponseDto,
  ChatMessageGetAllMessagesFromChatDto,
  AsyncThunkConfig
>(ActionType.GET_MESSAGES, async (payload, { extra }) => {
  const { chatsApi } = extra;
  const { id } = payload;

  const messagesDto = await chatsApi.getAllChatMessages(id);

  return {
    ...messagesDto,
    chatOpponent: payload.chatOpponent,
  };
});

const createMessage = createAsyncThunk<
  void,
  ChatMessageCreateRequestBodyDto,
  AsyncThunkConfig
>(ActionType.CREATE_MESSAGE, async (payload, { extra }) => {
  const { chatsApi } = extra;
  const { message, receiverId, chatId } = payload;

  await chatsApi.createChatMessage({
    message,
    receiverId,
    chatId,
  });
});

const checkHasUnreadMessages = createAsyncThunk<void, void, AsyncThunkConfig>(
  ActionType.CHECK_HAS_UNREAD_MESSAGES,
  async (_, { extra, dispatch }) => {
    const { chatsApi } = extra;
    const hasUnreadMessages = await chatsApi.hasUnreadMessages();

    dispatch(setHasUnreadMessages(hasUnreadMessages));
  },
);

const setHasUnreadMessages = createAction(
  ActionType.SET_HAS_UNREAD_MESSAGES,
  (hasUnreadMessages: boolean) => ({
    payload: hasUnreadMessages,
  }),
);

const getNewMessage = createAction(
  ActionType.GET_NEW_MESSAGE,
  (message: ChatMessageGetAllItemResponseDto) => {
    return {
      payload: message,
    };
  },
);

const listenToNewMessages = createAsyncThunk<void, void, AsyncThunkConfig>(
  ActionType.LISTEN_TO_MESSAGES,
  (_, { extra, dispatch }) => {
    const { chatsApi } = extra;

    const listenerCallback = (
      message: ChatMessageGetAllItemResponseDto,
    ): void => {
      dispatch(getNewMessage(message));
    };

    chatsApi.listenToNewMessages(listenerCallback);
  },
);

const removeMessageListener = createAsyncThunk<void, void, AsyncThunkConfig>(
  ActionType.REMOVE_LISTENER,
  (_, { extra }) => {
    const { chatsApi } = extra;
    chatsApi.removeMessageListener();
  },
);

const joinRoom = createAsyncThunk<void, string, AsyncThunkConfig>(
  ActionType.JOIN_ROOM,
  (chatId, { extra }) => {
    const { socket } = extra;

    socket.joinRoom(chatId);
  },
);

const leaveRoom = createAsyncThunk<void, string, AsyncThunkConfig>(
  ActionType.JOIN_ROOM,
  (chatId, { extra }) => {
    const { socket } = extra;

    socket.leaveRoom(chatId);
  },
);

export {
  checkHasUnreadMessages,
  createMessage,
  getLastMessages,
  getMessages,
  getNewMessage,
  joinRoom,
  leaveRoom,
  listenToNewMessages,
  removeMessageListener,
  setHasUnreadMessages,
};
