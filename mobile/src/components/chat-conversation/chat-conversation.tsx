import React, { FC } from 'react';

import defaultAvatar from '~/assets/images/avatar-default.png';
import { AppScreenName } from '~/common/enums/enums';
import { ChatMessageCreateRequestBodyDto } from '~/common/types/types';
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
    }));

  const dispatch = useAppDispatch();
  const navigation = useAppNavigate();

  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <BackButton
          onPress={(): void => navigation.navigate(AppScreenName.CHAT)}
        />
      ),
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
  }, []);

  const handleMessageSubmit = (
    payload: ChatMessageCreateRequestBodyDto,
  ): void => {
    dispatch(chatActions.createMessage(payload));
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
      <View>
        {chatOpponent && (
          <MessageForm
            chatId={chatId}
            chatOpponentId={chatOpponent.id}
            onSubmit={handleMessageSubmit}
          />
        )}
      </View>
    </View>
  );
};

export { ChatConversation };
