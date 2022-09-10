import React, { FC } from 'react';

import {
  ChatMessageGetAllItemResponseDto,
  ChatMessageGetEmptyChatDto,
  ChatMessageUserResponseDto,
} from '~/common/types/types';
import { ScrollView, Text } from '~/components/common/common';

import { Conversation } from './components/conversation/conversation';
import { styles } from './styles';

type Props = {
  currentUserId: number;
  chatsItems: ChatMessageGetAllItemResponseDto[];
  onChatMessagesLoad: (chatId: string) => void;
  emptyChats: ChatMessageGetEmptyChatDto[];
};

const ConversationsList: FC<Props> = ({
  chatsItems,
  currentUserId,
  onChatMessagesLoad,
  emptyChats = [],
}) => {
  const hasChats = Boolean(chatsItems.length) && Boolean(emptyChats.length);

  if (!hasChats) {
    return <Text style={styles.noMessages}>No conversations yet</Text>;
  }

  return (
    <ScrollView>
      {chatsItems.map((chat, index) => {
        const chatOpponent: ChatMessageUserResponseDto =
          chat.sender.id === currentUserId ? chat.receiver : chat.sender;

        return (
          <Conversation
            key={index}
            chatId={chat.chatId}
            chatOpponent={chatOpponent}
            currentUserId={currentUserId}
            lastMessage={chat.message}
            lastMessageDate={chat.createdAt}
            messageSenderId={chat.sender.id}
            onPress={onChatMessagesLoad}
          />
        );
      })}
      {emptyChats.map((chat, index) => (
        <Conversation
          key={index}
          chatId={chat.chatId}
          chatOpponent={chat.receiver}
          currentUserId={currentUserId}
          messageSenderId={chat.receiver.id}
          onPress={onChatMessagesLoad}
        />
      ))}
    </ScrollView>
  );
};

export { ConversationsList };
