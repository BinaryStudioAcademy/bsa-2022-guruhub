import { createReducer } from '@reduxjs/toolkit';
import { DataStatus } from 'common/enums/enums';
import {
  ChatMessageGetAllItemResponseDto,
  ChatMessageGetEmptyChatDto,
  UsersGetResponseDto,
} from 'common/types/types';

import {
  addMessage,
  checkHasUnreadMessages,
  createMessage,
  getLastMessages,
  getMessages,
  readMessages,
  setHasUnreadMessages,
} from './actions';

type State = {
  dataStatus: DataStatus;
  lastMessages: ChatMessageGetAllItemResponseDto[];
  emptyChats: ChatMessageGetEmptyChatDto[];
  fetchLastMessagesDataStatus: DataStatus;
  currentChatMessagesDataStatus: DataStatus;
  currentChatMessages: ChatMessageGetAllItemResponseDto[];
  currentChatId: string | null;
  hasUnreadMessages: boolean;
  chatOpponent: UsersGetResponseDto | null;
};

const initialState: State = {
  dataStatus: DataStatus.IDLE,
  lastMessages: [],
  emptyChats: [],
  fetchLastMessagesDataStatus: DataStatus.IDLE,
  currentChatMessagesDataStatus: DataStatus.IDLE,
  currentChatMessages: [],
  currentChatId: null,
  hasUnreadMessages: false,
  chatOpponent: null,
};

const reducer = createReducer(initialState, (builder) => {
  builder.addCase(getLastMessages.pending, (state) => {
    state.fetchLastMessagesDataStatus = DataStatus.PENDING;
  });
  builder.addCase(getLastMessages.fulfilled, (state, action) => {
    state.fetchLastMessagesDataStatus = DataStatus.FULFILLED;
    state.lastMessages = action.payload.items;
    state.emptyChats = action.payload.emptyChats;
  });
  builder.addCase(getLastMessages.rejected, (state) => {
    state.fetchLastMessagesDataStatus = DataStatus.REJECTED;
  });

  builder.addCase(getMessages.pending, (state) => {
    state.currentChatMessagesDataStatus = DataStatus.PENDING;
  });
  builder.addCase(getMessages.fulfilled, (state, action) => {
    state.currentChatMessagesDataStatus = DataStatus.FULFILLED;
    state.currentChatMessages = action.payload.items;
    state.currentChatId = action.payload.chatId;
    state.chatOpponent = action.payload.chatOpponent;
  });
  builder.addCase(getMessages.rejected, (state) => {
    state.currentChatMessagesDataStatus = DataStatus.REJECTED;
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

  builder.addCase(readMessages.fulfilled, (state, { payload }) => {
    state.dataStatus = DataStatus.FULFILLED;
    state.hasUnreadMessages = payload;
  });
  builder.addCase(readMessages.rejected, (state) => {
    state.dataStatus = DataStatus.REJECTED;
  });

  builder.addCase(addMessage, (state, { payload }) => {
    if (state.currentChatId === payload.chatId) {
      state.currentChatMessages = [...state.currentChatMessages, payload];
    }
    state.lastMessages = state.lastMessages.map((lastMessage) => {
      if (lastMessage.chatId === payload.chatId) {
        return payload;
      }

      return lastMessage;
    });
    state.hasUnreadMessages = true;
  });

  builder.addCase(createMessage.fulfilled, (state, { payload }) => {
    state.currentChatMessages = [...state.currentChatMessages, payload];

    const currentChatLastMessage = state.lastMessages.find(
      (lastMessage) => lastMessage.chatId === payload.chatId,
    );

    if (currentChatLastMessage) {
      state.lastMessages = state.lastMessages.map((lastMessage) => {
        if (lastMessage.chatId === payload.chatId) {
          return payload;
        }

        return lastMessage;
      });
    } else {
      state.lastMessages = [...state.lastMessages, payload];
      const notEmptyChat = state.emptyChats.find(
        (emptyChat) => emptyChat.chatId === payload.chatId,
      );

      if (notEmptyChat) {
        state.emptyChats = state.emptyChats.filter((emptyChat) => {
          return emptyChat !== notEmptyChat;
        });
      }
    }
  });
});

export { reducer };
