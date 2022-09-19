import React, { FC, ReactElement } from 'react';

import defaultAvatar from '~/assets/images/avatar-default.png';
import { ChatMessageGetAllItemResponseDto } from '~/common/types/types';
import { SectionList, Text, View } from '~/components/common/common';
import { getFormattedDate, getImageUri } from '~/helpers/helpers';
import { useCallback, useFocusEffect, useRef } from '~/hooks/hooks';

import { DateSeparator, Message } from './components/components';
import { groupMessagesByDate } from './helpers/helpers';
import { styles } from './styles';

type Props = {
  currentUserId: number;
  messages: ChatMessageGetAllItemResponseDto[];
};

const MessagesList: FC<Props> = ({ currentUserId, messages }) => {
  const chatRef = useRef<SectionList>(null);
  const groupedByDateMessages = groupMessagesByDate(messages);
  const messagesToRender = Object.entries(groupedByDateMessages).map(
    ([key, value]) => ({
      title: key,
      data: value,
    }),
  );

  const scrollToDown = (): void => {
    if (messagesToRender.length) {
      chatRef.current?.scrollToLocation({
        animated: false,
        itemIndex: 0,
        sectionIndex: 0,
      });
    }
  };

  useFocusEffect(
    useCallback(() => {
      scrollToDown();
    }, []),
  );

  return (
    <View style={styles.container}>
      <SectionList
        ref={chatRef}
        sections={messagesToRender}
        keyExtractor={({ id }): string => id.toString()}
        renderItem={({ item: message, index }): ReactElement => (
          <View style={Boolean(index) && styles.messageSeparator}>
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
        renderSectionHeader={({ section: { title } }): ReactElement => (
          <DateSeparator messageTime={title} />
        )}
        ListEmptyComponent={(): ReactElement => (
          <Text>
            No messages yet! Type something to start a new conversation.
          </Text>
        )}
        inverted
        contentContainerStyle={styles.messageList}
        getItemLayout={(
          _item,
          index,
        ): { length: number; offset: number; index: number } => ({
          length: messagesToRender.length,
          offset: messagesToRender.length * index,
          index,
        })}
      />
    </View>
  );
};

export { MessagesList };
