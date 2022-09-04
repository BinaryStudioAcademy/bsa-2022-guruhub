import { createReducer } from '@reduxjs/toolkit';
import { DataStatus } from 'common/enums/enums';
import {
  ChatMessageGetAllItemResponseDto,
  ChatParticipantsDto,
} from 'common/types/types';

import {
  checkHasUnreadMessages,
  cleanHasUnreadMessages,
  createMessage,
  getLastMessages,
  getMessages,
} from './actions';

type State = {
  dataStatus: DataStatus;
  lastMessages: ChatMessageGetAllItemResponseDto[];
  currentChatMessages: ChatMessageGetAllItemResponseDto[];
  currentChatId: string | null;
  chatParticipants: ChatParticipantsDto | null;
  hasUnreadMessages: boolean;
};

const initialState: State = {
  dataStatus: DataStatus.IDLE,
  lastMessages: [],
  currentChatMessages: [],
  currentChatId: null,
  chatParticipants: null,
  hasUnreadMessages: false,
};

const reducer = createReducer(initialState, (builder) => {
  builder.addCase(getLastMessages.pending, (state) => {
    state.dataStatus = DataStatus.PENDING;
  });
  builder.addCase(getLastMessages.fulfilled, (state, action) => {
    state.dataStatus = DataStatus.FULFILLED;
    state.lastMessages = action.payload.items;
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
    state.chatParticipants = action.payload.participants;
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
  builder.addCase(checkHasUnreadMessages.fulfilled, (state, action) => {
    state.dataStatus = DataStatus.FULFILLED;
    state.hasUnreadMessages = action.payload;
  });
  builder.addCase(checkHasUnreadMessages.rejected, (state) => {
    state.dataStatus = DataStatus.REJECTED;
  });

  builder.addCase(cleanHasUnreadMessages.fulfilled, (state, { payload }) => {
    state.hasUnreadMessages = payload;
  });
});

export { reducer };
