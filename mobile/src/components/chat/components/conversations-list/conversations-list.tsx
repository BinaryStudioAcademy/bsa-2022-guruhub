import React, { FC, ReactElement } from 'react';

import {
  ChatMessageGetAllItemResponseDto,
  ChatMessageUserResponseDto,
} from '~/common/types/types';
import { FlatList, Text } from '~/components/common/common';

import { Conversation } from './components/components';
import { styles } from './styles';

type Props = {
  currentUserId: number;
  chatsItems?: ChatMessageGetAllItemResponseDto[];
  onChatMessagesLoad: (chatId: string) => void;
};

const ConversationsList: FC<Props> = ({
  chatsItems,
  currentUserId,
  onChatMessagesLoad,
}) => {
  return (
    <FlatList
      data={chatsItems}
      keyExtractor={({ id }): string => id.toString()}
      renderItem={({ item: chat, index }): ReactElement => {
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
      }}
      ListEmptyComponent={(): ReactElement => (
        <Text style={styles.noMessages}>No conversations yet</Text>
      )}
    />
  );
};

export { ConversationsList };
