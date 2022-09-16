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

const createMessage = createAction(
  ActionType.CREATE_MESSAGE,
  (payload: ChatMessageCreateRequestBodyDto) => {
    return {
      payload,
    };
  },
);

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

const addMessage = createAction(
  ActionType.GET_NEW_MESSAGE,
  (message: ChatMessageGetAllItemResponseDto) => {
    return {
      payload: message,
    };
  },
);

const joinRoom = createAction(ActionType.JOIN_ROOM, (chatId: string) => {
  return {
    payload: chatId,
  };
});

const leaveRoom = createAction(ActionType.JOIN_ROOM, (chatId: string) => {
  return {
    payload: chatId,
  };
});

export {
  addMessage,
  checkHasUnreadMessages,
  createMessage,
  getLastMessages,
  getMessages,
  joinRoom,
  leaveRoom,
  setHasUnreadMessages,
};
