import { createReducer } from '@reduxjs/toolkit';

import { DataStatus } from '~/common/enums/enums';
import {
  ChatMessageGetAllItemResponseDto,
  ChatMessageGetEmptyChatDto,
  UsersGetResponseDto,
} from '~/common/types/types';

import {
  checkHasUnreadMessages,
  createMessage,
  getLastMessages,
  getMessages,
  setHasUnreadMessages,
} from './actions';

type State = {
  dataStatus: DataStatus;
  lastMessages: ChatMessageGetAllItemResponseDto[];
  emptyChats: ChatMessageGetEmptyChatDto[];
  currentChatMessages: ChatMessageGetAllItemResponseDto[];
  currentChatId: string | null;
  hasUnreadMessages: boolean;
  chatOpponent: UsersGetResponseDto | null;
};

const initialState: State = {
  dataStatus: DataStatus.IDLE,
  lastMessages: [],
  emptyChats: [],
  currentChatMessages: [],
  currentChatId: null,
  hasUnreadMessages: false,
  chatOpponent: null,
};

const reducer = createReducer(initialState, (builder) => {
  builder.addCase(getLastMessages.pending, (state) => {
    state.dataStatus = DataStatus.PENDING;
  });
  builder.addCase(getLastMessages.fulfilled, (state, action) => {
    state.dataStatus = DataStatus.FULFILLED;
    state.lastMessages = action.payload.items;
    state.emptyChats = action.payload.emptyChats;
  });
  builder.addCase(getLastMessages.rejected, (state) => {
    state.dataStatus = DataStatus.REJECTED;
  });

  builder.addCase(getMessages.pending, (state) => {
    state.dataStatus = DataStatus.PENDING;
  });
  builder.addCase(getMessages.fulfilled, (state, action) => {
    state.dataStatus = DataStatus.FULFILLED;
    state.currentChatMessages = action.payload.items;
    state.currentChatId = action.payload.chatId;
    state.chatOpponent = action.payload.chatOpponent;
  });
  builder.addCase(getMessages.rejected, (state) => {
    state.dataStatus = DataStatus.REJECTED;
  });

  builder.addCase(createMessage.pending, (state) => {
    state.dataStatus = DataStatus.PENDING;
  });
  builder.addCase(createMessage.fulfilled, (state, action) => {
    state.dataStatus = DataStatus.FULFILLED;
    state.currentChatMessages = [...state.currentChatMessages, action.payload];
    state.currentChatId = action.payload.chatId;
  });
  builder.addCase(createMessage.rejected, (state) => {
    state.dataStatus = DataStatus.REJECTED;
  });

  builder.addCase(checkHasUnreadMessages.pending, (state) => {
    state.dataStatus = DataStatus.PENDING;
  });
  builder.addCase(checkHasUnreadMessages.fulfilled, (state) => {
    state.dataStatus = DataStatus.FULFILLED;
  });
  builder.addCase(checkHasUnreadMessages.rejected, (state) => {
    state.dataStatus = DataStatus.REJECTED;
  });

  builder.addCase(setHasUnreadMessages, (state, { payload }) => {
    state.hasUnreadMessages = payload;
  });
});

export { reducer };
