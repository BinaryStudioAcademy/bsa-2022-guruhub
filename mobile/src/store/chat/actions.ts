import { createAction, createAsyncThunk } from '@reduxjs/toolkit';

import {
  AsyncThunkConfig,
  ChatMessageCreateRequestBodyDto,
  ChatMessageFilteringDto,
  ChatMessageGetAllItemResponseDto,
  ChatMessageGetAllLastWithEmptyChatsDto,
  ChatMessageGetAllRequestParamsDto,
  ChatMessageGetAllResponseDto,
} from '~/common/types/types';

import { ActionType } from './common';

const getLastMessages = createAsyncThunk<
  ChatMessageGetAllLastWithEmptyChatsDto,
  ChatMessageFilteringDto,
  AsyncThunkConfig
>(ActionType.GET_LAST_MESSAGES, async ({ fullName }, { extra }) => {
  const { chatApi } = extra;
  const lastMessages = await chatApi.getAllChatsLastMessages({
    filtering: { fullName },
  });

  return lastMessages;
});

const getMessages = createAsyncThunk<
  ChatMessageGetAllResponseDto,
  ChatMessageGetAllRequestParamsDto,
  AsyncThunkConfig
>(ActionType.GET_MESSAGES, async (payload, { extra }) => {
  const { chatApi } = extra;
  const { id } = payload;

  const messagesDto = await chatApi.getAllChatMessages(id);

  return messagesDto;
});

const createMessage = createAsyncThunk<
  ChatMessageGetAllItemResponseDto,
  ChatMessageCreateRequestBodyDto,
  AsyncThunkConfig
>(ActionType.CREATE_MESSAGE, async (payload, { extra }) => {
  const { chatApi } = extra;
  const { message, receiverId, chatId } = payload;
  const newMessage = await chatApi.createChatMessage({
    message,
    receiverId,
    chatId,
  });

  return newMessage;
});

const checkHasUnreadMessages = createAsyncThunk<void, void, AsyncThunkConfig>(
  ActionType.CHECK_HAS_UNREAD_MESSAGES,
  async (_, { extra, dispatch }) => {
    const { chatApi } = extra;
    const hasUnreadMessages = await chatApi.hasUnreadMessages();

    dispatch(setHasUnreadMessages(hasUnreadMessages));
  },
);

const setHasUnreadMessages = createAction(
  ActionType.SET_HAS_UNREAD_MESSAGES,
  (hasUnreadMessages: boolean) => ({
    payload: hasUnreadMessages,
  }),
);

export {
  checkHasUnreadMessages,
  createMessage,
  getLastMessages,
  getMessages,
  setHasUnreadMessages,
};
