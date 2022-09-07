import React, { FC } from 'react';

import { Image, Text, View } from '~/components/common/common';

import { styles } from './styles';

type Props = {
  messageText: string;
  messageDate: string;
  messageOpponentAvatar: string;
  isUserMessageSender: boolean;
};

const Message: FC<Props> = ({
  messageText,
  messageDate,
  messageOpponentAvatar,
  isUserMessageSender,
}) => {
  return (
    <View style={styles.message}>
      {!isUserMessageSender && (
        <Image
          style={styles.opponentMessageAvatar}
          source={{ uri: messageOpponentAvatar }}
        />
      )}
      <View>
        <Text
          style={
            isUserMessageSender
              ? styles.userMessageText
              : styles.opponentMessageText
          }
        >
          {messageText}
        </Text>
        <Text
          style={
            isUserMessageSender
              ? styles.userMessageTime
              : styles.opponentMessageTime
          }
        >
          {messageDate}
        </Text>
      </View>
    </View>
  );
};

export { Message };
