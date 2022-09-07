import React, { FC } from 'react';

import defaultAvatar from '~/assets/images/avatar-default.png';
import { ChatMessageUserResponseDto } from '~/common/types/types';
import { OPPONENT_MESSAGE_SHORT_LENGTH } from '~/components/chat/common/constants/constants';
import { Image, Pressable, Text, View } from '~/components/common/common';
import { getFormattedDate, getImageUri } from '~/helpers/helpers';

import { styles } from './styles';

type Props = {
  chatId: string;
  currentUserId: number;
  messageSenderId: number;
  chatOpponent: ChatMessageUserResponseDto;
  lastMessage: string;
  lastMessageDate: string;
  onPress: (chatId: string) => void;
};

const Conversation: FC<Props> = ({
  chatId,
  currentUserId,
  messageSenderId,
  chatOpponent,
  lastMessage,
  lastMessageDate,
  onPress,
}) => {
  const messageStart = messageSenderId === currentUserId ? 'You: ' : '';
  const messageShortView = `${lastMessage.slice(
    0,
    OPPONENT_MESSAGE_SHORT_LENGTH,
  )}...`;
  const chatLastMessage = `${messageStart}${messageShortView}`;

  const messageDate = getFormattedDate(lastMessageDate, 'HH:mm');

  const handleChatSelect = (): void => {
    onPress(chatId);
  };

  return (
    <Pressable style={styles.container} onPress={handleChatSelect}>
      <View>
        <Image
          style={styles.avatar}
          source={{
            uri:
              chatOpponent.userDetails.avatar?.url ??
              getImageUri(defaultAvatar),
          }}
        />
      </View>
      <View style={{ flex: 1 }}>
        <Text style={styles.opponentName}>
          {chatOpponent.userDetails.fullName}
        </Text>
        <Text style={styles.opponentMessage}>{chatLastMessage}</Text>
      </View>
      <View>
        <Text style={styles.date}>{messageDate}</Text>
      </View>
    </Pressable>
  );
};

export { Conversation };
