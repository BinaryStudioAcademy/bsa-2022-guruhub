import React, { FC } from 'react';
import { Text as UIText } from 'react-native';

import defaultAvatar from '~/assets/images/avatar-default.png';
import { UsersGetResponseDto } from '~/common/types/types';
import { Image, Pressable, Text, View } from '~/components/common/common';
import { getFormattedDate, getImageUri } from '~/helpers/helpers';

import { styles } from './styles';

type Props = {
  chatId: string;
  currentUserId: number;
  messageSenderId: number;
  chatOpponent: UsersGetResponseDto;
  lastMessage?: string;
  lastMessageDate?: string;
  onPress: (chatId: string, chatOpponent: UsersGetResponseDto) => void;
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
  const message = `${messageStart}${lastMessage ?? ''}`;

  const messageDate =
    lastMessageDate && getFormattedDate(lastMessageDate, 'HH:mm');

  const handleChatSelect = (): void => {
    onPress(chatId, chatOpponent);
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
      <View style={styles.messageWrapper}>
        <Text style={styles.opponentName}>
          {chatOpponent.userDetails.fullName}
        </Text>
        {lastMessageDate && (
          <UIText
            style={styles.opponentMessage}
            ellipsizeMode="tail"
            numberOfLines={1}
          >
            {message}
          </UIText>
        )}
      </View>
      {messageDate && <Text style={styles.date}>{messageDate}</Text>}
    </Pressable>
  );
};

export { Conversation };
