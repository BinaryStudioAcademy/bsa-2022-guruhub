import { createReducer } from '@reduxjs/toolkit';
import { DataStatus } from 'common/enums/enums';
import {
  ChatMessageGetAllItemResponseDto,
  ChatParticipantsDto,
} from 'common/types/types';

import { createMessage, getLastMessages, getMessages } from './actions';

type State = {
  dataStatus: DataStatus;
  lastMessages: ChatMessageGetAllItemResponseDto[];
  currentChatMessages: ChatMessageGetAllItemResponseDto[];
  currentChatId: string | null;
  chatParticipants: ChatParticipantsDto | null;
};

const initialState: State = {
  dataStatus: DataStatus.IDLE,
  lastMessages: [],
  currentChatMessages: [],
  currentChatId: null,
  chatParticipants: null,
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
});

export { reducer };
