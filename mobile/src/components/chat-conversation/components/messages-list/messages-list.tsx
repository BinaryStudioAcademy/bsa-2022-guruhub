import React, { FC, ReactElement } from 'react';

import defaultAvatar from '~/assets/images/avatar-default.png';
import { ChatMessageGetAllItemResponseDto } from '~/common/types/types';
import { FlatList, Text, View } from '~/components/common/common';
import { getFormattedDate, getImageUri } from '~/helpers/helpers';

import { Message } from './components/components';
import { styles } from './styles';

type Props = {
  currentUserId: number;
  messages: ChatMessageGetAllItemResponseDto[];
};

const MessagesList: FC<Props> = ({ currentUserId, messages }) => {
  return (
    <View style={styles.container}>
      <FlatList
        data={messages}
        keyExtractor={({ id }): string => id.toString()}
        renderItem={({ item: message, index }): ReactElement => (
          <Message
            key={index}
            messageText={message.message}
            isUserMessageSender={message.sender.id === currentUserId}
            messageDate={getFormattedDate(message.createdAt, 'HH:mm')}
            messageOpponentAvatar={
              message.sender.userDetails.avatar?.url ??
              getImageUri(defaultAvatar)
            }
          />
        )}
        ListEmptyComponent={(): ReactElement => (
          <Text>
            No messages yet! Type something to start a new conversation.
          </Text>
        )}
      />
    </View>
  );
};

export { MessagesList };
