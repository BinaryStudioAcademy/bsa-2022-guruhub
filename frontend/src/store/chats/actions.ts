import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  AsyncThunkConfig,
  ChatMessageCreateRequestBodyDto,
  ChatMessageGetAllItemResponseDto,
  ChatMessageGetAllRequestParamsDto,
  ChatMessageGetAllResponseDto,
  ChatMessagesGetAllWithParticipantsDto,
} from 'common/types/types';

import { ActionType } from './common';

const getLastMessages = createAsyncThunk<
  ChatMessageGetAllResponseDto,
  void,
  AsyncThunkConfig
>(ActionType.GET_LAST_MESSAGES, async (_, { extra }) => {
  const { chatsApi } = extra;
  const lastMessages = await chatsApi.getAllChatsLastMessages();

  return lastMessages;
});

const getMessages = createAsyncThunk<
  ChatMessagesGetAllWithParticipantsDto,
  ChatMessageGetAllRequestParamsDto,
  AsyncThunkConfig
>(ActionType.GET_MESSAGES, async (payload, { extra }) => {
  const { chatsApi } = extra;
  const { id } = payload;

  const messages = await chatsApi.getAllChatMessages(id);
  let participants = null;

  const [currentChatMessage] = messages.items;

  if (currentChatMessage) {
    participants = {
      first: currentChatMessage.sender,
      second: currentChatMessage.receiver,
    };
  }

  return {
    ...messages,
    participants,
  };
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

const checkHasUnreadMessages = createAsyncThunk<
  boolean,
  void,
  AsyncThunkConfig
>(ActionType.CHECK_HAS_UNREAD_MESSAGES, async (_, { extra }) => {
  const { chatsApi } = extra;

  const hasUnreadMessages = await chatsApi.hasUnreadMessages();

  return hasUnreadMessages;
});

const cleanHasUnreadMessages = createAsyncThunk<
  boolean,
  void,
  AsyncThunkConfig
>(ActionType.CLEAN_HAS_UNREAD_MESSAGES, () => {
  return false;
});

export {
  checkHasUnreadMessages,
  cleanHasUnreadMessages,
  createMessage,
  getLastMessages,
  getMessages,
};
