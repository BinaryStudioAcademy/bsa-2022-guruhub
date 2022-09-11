import React, { FC, ReactElement } from 'react';

import defaultAvatar from '~/assets/images/avatar-default.png';
import { ChatMessageGetAllItemResponseDto } from '~/common/types/types';
import { SectionList, Text, View } from '~/components/common/common';
import { getFormattedDate, getImageUri } from '~/helpers/helpers';

import { DateSeparator, Message } from './components/components';
import { groupMessagesByDate } from './helpers/helpers';
import { styles } from './styles';

type Props = {
  currentUserId: number;
  messages: ChatMessageGetAllItemResponseDto[];
};

const MessagesList: FC<Props> = ({ currentUserId, messages }) => {
  const groupedByDateMessages = groupMessagesByDate(messages);
  const renderMessages = Object.entries(groupedByDateMessages).map(
    ([key, value]) => ({
      title: key,
      data: value.sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
      ),
    }),
  );

  return (
    <View style={styles.container}>
      <SectionList
        sections={renderMessages}
        keyExtractor={({ id }): string => id.toString()}
        renderItem={({ item: message }): ReactElement => (
          <View style={styles.messageList}>
            <Message
              messageText={message.message}
              isUserMessageSender={message.sender.id === currentUserId}
              messageDate={getFormattedDate(message.createdAt, 'HH:mm')}
              messageOpponentAvatar={
                message.sender.userDetails.avatar?.url ??
                getImageUri(defaultAvatar)
              }
            />
          </View>
        )}
        renderSectionFooter={({ section: { title } }): ReactElement => (
          <DateSeparator messageTime={title} />
        )}
        ListEmptyComponent={(): ReactElement => (
          <Text>
            No messages yet! Type something to start a new conversation.
          </Text>
        )}
        inverted
        contentContainerStyle={styles.messageList}
      />
    </View>
  );
};

export { MessagesList };
