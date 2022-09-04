import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  AsyncThunkConfig,
  ChatMessageCreateRequestBodyDto,
  ChatMessageFilteringDto,
  ChatMessageGetAllItemResponseDto,
  ChatMessageGetAllLastResponseDto,
  ChatMessageGetAllRequestParamsDto,
  ChatMessageGetAllResponseDto,
} from 'common/types/types';

import { ActionType } from './common';

const getLastMessages = createAsyncThunk<
  ChatMessageGetAllLastResponseDto,
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
  ChatMessageGetAllRequestParamsDto,
  AsyncThunkConfig
>(ActionType.GET_MESSAGES, async (payload, { extra }) => {
  const { chatsApi } = extra;
  const { id } = payload;

  const messagesDto = await chatsApi.getAllChatMessages(id);

  return messagesDto;
});

const createMessage = createAsyncThunk<
  ChatMessageGetAllItemResponseDto,
  ChatMessageCreateRequestBodyDto,
  AsyncThunkConfig
>(ActionType.CREATE_MESSAGE, async (payload, { extra }) => {
  const { chatsApi } = extra;
  const { message, receiverId, chatId } = payload;
  const newMessage = await chatsApi.createChatMessage({
    message,
    receiverId,
    chatId,
  });

  return newMessage;
});

export { createMessage, getLastMessages, getMessages };
