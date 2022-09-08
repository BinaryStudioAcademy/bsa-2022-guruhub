import React, { FC } from 'react';

import {
  AppScreenName,
  AuthScreenName,
  DataStatus,
  RootScreenName,
} from '~/common/enums/enums';
import { UserWithPermissions } from '~/common/types/types';
import { Button, Spinner, Text, View } from '~/components/common/common';
import {
  useAppDispatch,
  useAppNavigate,
  useAppSelector,
  useEffect,
} from '~/hooks/hooks';
import { chatActions } from '~/store/actions';

import { ConversationsList } from './components/components';
import { styles } from './styles';

const Chat: FC = () => {
  const { authDataStatus, chatDataStatus, lastMessages, user } = useAppSelector(
    ({ auth, chat }) => ({
      authDataStatus: auth.dataStatus,
      user: auth.user,
      chatDataStatus: chat.dataStatus,
      lastMessages: chat.lastMessages,
    }),
  );

  const dispatch = useAppDispatch();
  const navigation = useAppNavigate();

  const handleChatMessagesLoad = (chatId: string): void => {
    dispatch(chatActions.getMessages({ id: chatId }));
    navigation.navigate(AppScreenName.CONVERSATION);
  };

  const handleLogIn = (): void => {
    navigation.navigate(RootScreenName.AUTH, {
      screen: AuthScreenName.SIGN_IN,
    });
  };

  useEffect(() => {
    dispatch(chatActions.getLastMessages({ fullName: '' }));
  }, [dispatch]);

  if (
    chatDataStatus === DataStatus.PENDING ||
    authDataStatus === DataStatus.PENDING
  ) {
    return <Spinner isOverflow />;
  }

  if (!user) {
    return (
      <View style={styles.placeholder}>
        <Text style={styles.noUser}>No conversations yet.</Text>
        <Text style={styles.noUser}>Sign in first.</Text>
        <View style={styles.buttonWrapper}>
          <Button label="Sign in" onPress={handleLogIn} />
        </View>
      </View>
    );
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
