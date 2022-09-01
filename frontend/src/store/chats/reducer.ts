import { createReducer } from '@reduxjs/toolkit';
import { DataStatus } from 'common/enums/enums';
import { ChatMessageGetAllItemResponseDto } from 'common/types/types';

import { createMessage, getLastMessages, getMessages } from './actions';

type State = {
  dataStatus: DataStatus;
  lastMessages: ChatMessageGetAllItemResponseDto[];
  messages: ChatMessageGetAllItemResponseDto[];
};

const initialState: State = {
  dataStatus: DataStatus.IDLE,
  lastMessages: [],
  messages: [],
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
    state.lastMessages = action.payload.items;
  });
  builder.addCase(getMessages.rejected, (state) => {
    state.dataStatus = DataStatus.REJECTED;
  });

  builder.addCase(createMessage.pending, (state) => {
    state.dataStatus = DataStatus.PENDING;
  });
  builder.addCase(createMessage.fulfilled, (state, action) => {
    state.dataStatus = DataStatus.FULFILLED;
    state.messages = [...state.messages, action.payload];
  });
  builder.addCase(createMessage.rejected, (state) => {
    state.dataStatus = DataStatus.REJECTED;
  });
});

export { reducer };
