import React, { FC } from 'react';

import defaultAvatar from '~/assets/images/avatar-default.png';
import { ChatMessageFormRequestDto } from '~/common/types/types';
import { BackButton, Image, View } from '~/components/common/common';
import { getImageUri } from '~/helpers/helpers';
import {
  useAppDispatch,
  useAppNavigate,
  useAppSelector,
  useEffect,
} from '~/hooks/hooks';
import { chatActions } from '~/store/actions';

import { MessageForm, MessagesList } from './components/components';
import { styles } from './styles';

const ChatConversation: FC = () => {
  const { chatId, currentChatMessages, chatOpponent, currentUserId } =
    useAppSelector(({ auth, chat }) => ({
      chatId: chat.currentChatId,
      currentChatMessages: chat.currentChatMessages,
      chatOpponent: chat.chatOpponent,
      currentUserId: auth.user?.id,
      dataStatus: chat.dataStatus,
    }));

  const dispatch = useAppDispatch();
  const navigation = useAppNavigate();

  useEffect(() => {
    navigation.getParent()?.setOptions({
      headerShown: false,
    }),
      navigation.setOptions({
        headerShown: true,
        headerLeft: () => <BackButton onPress={navigation.goBack} />,
        headerTitle: chatOpponent && chatOpponent.userDetails.fullName,
        headerRight: () => (
          <Image
            style={styles.opponentAvatar}
            source={{
              uri:
                chatOpponent?.userDetails.avatar?.url ??
                getImageUri(defaultAvatar),
            }}
          />
        ),
      });
  }, [chatOpponent]);

  const handleMessageSubmit = (payload: ChatMessageFormRequestDto): void => {
    if (chatOpponent) {
      dispatch(
        chatActions.createMessage({
          chatId,
          receiverId: chatOpponent.id,
          message: payload.message,
        }),
      );
    }
  };

  const hasMessages = Boolean(currentChatMessages.length);

  return (
    <View style={styles.container}>
      <View style={styles.messagesWrapper}>
        {hasMessages && (
          <MessagesList
            currentUserId={currentUserId as number}
            messages={currentChatMessages}
          />
        )}
      </View>
      {chatOpponent && <MessageForm onSubmit={handleMessageSubmit} />}
    </View>
  );
};

export { ChatConversation };
