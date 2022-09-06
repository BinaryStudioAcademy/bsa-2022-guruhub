import React, { FC } from 'react';

import { DataStatus } from '~/common/enums/enums';
import { UserWithPermissions } from '~/common/types/types';
import { Spinner, View } from '~/components/common/common';
import { useAppDispatch, useAppSelector } from '~/hooks/hooks';
import { chatActions } from '~/store/actions';

import { ConversationsList } from './components/components';
import { styles } from './styles';

const Chat: FC = () => {
  const {
    authDataStatus,
    chatDataStatus,
    lastMessages,
    user,
    // chatId,
    // currentChatMessages,
    // chatOpponent,
  } = useAppSelector(({ auth, chat }) => ({
    authDataStatus: auth.dataStatus,
    user: auth.user,
    chatDataStatus: chat.dataStatus,
    lastMessages: chat.lastMessages,
    chatId: chat.currentChatId,
    currentChatMessages: chat.currentChatMessages,
    chatOpponent: chat.chatOpponent,
  }));

  const dispatch = useAppDispatch();

  const handleChatMessagesLoad = (chatId: string): void => {
    dispatch(chatActions.getMessages({ id: chatId }));
  };

  if (
    chatDataStatus === DataStatus.PENDING ||
    authDataStatus === DataStatus.PENDING
  ) {
    return <Spinner isOverflow />;
  }

  return (
    <View style={styles.container}>
      <ConversationsList
        chatsItems={lastMessages}
        currentUserId={(user as UserWithPermissions).id}
        onChatMessagesLoad={handleChatMessagesLoad}
      />
    </View>
  );
};

export { Chat };
