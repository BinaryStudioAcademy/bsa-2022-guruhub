import React, { FC } from 'react';

import { ChatScreenName, DataStatus } from '~/common/enums/enums';
import { UsersGetResponseDto, UserWithPermissions } from '~/common/types/types';
import { FAB, Search, Spinner, View } from '~/components/common/common';
import {
  useAppDispatch,
  useAppNavigate,
  useAppSelector,
  useCallback,
  useFocusEffect,
} from '~/hooks/hooks';
import { chatActions } from '~/store/actions';

import { ConversationsList } from './components/components';
import { styles } from './styles';

const Chat: FC = () => {
  const { authDataStatus, chatDataStatus, lastMessages, user, emptyChats } =
    useAppSelector(({ auth, chat }) => ({
      authDataStatus: auth.dataStatus,
      user: auth.user,
      chatDataStatus: chat.dataStatus,
      lastMessages: chat.lastMessages,
      emptyChats: chat.emptyChats,
    }));

  const dispatch = useAppDispatch();
  const navigation = useAppNavigate();

  const handleChatMessagesLoad = (
    chatId: string,
    chatOpponent: UsersGetResponseDto,
  ): void => {
    dispatch(chatActions.getMessages({ id: chatId, chatOpponent }));
    navigation.navigate(ChatScreenName.CONVERSATION);
  };

  const handleSearch = (search: string): void => {
    dispatch(chatActions.getLastMessages({ fullName: search }));
  };

  const handleAddChat = (): void => {
    navigation.navigate(ChatScreenName.ALL_CHATS);
  };

  useFocusEffect(
    useCallback(() => {
      navigation.getParent()?.setOptions({
        headerShown: true,
      }),
        dispatch(chatActions.getLastMessages({ fullName: '' }));
    }, []),
  );

  if (authDataStatus === DataStatus.PENDING) {
    return <Spinner isOverflow />;
  }

  return (
    <>
      <View style={styles.searchFieldContainer}>
        <Search onSearch={handleSearch} />
      </View>
      {chatDataStatus === DataStatus.PENDING ? (
        <View style={styles.spinnerContainer}>
          <Spinner isOverflow />
        </View>
      ) : (
        <View style={styles.container}>
          <ConversationsList
            chatsItems={lastMessages}
            currentUserId={(user as UserWithPermissions).id}
            onChatMessagesLoad={handleChatMessagesLoad}
          />
        </View>
      )}
      {Boolean(emptyChats.length) && <FAB onPress={handleAddChat} />}
    </>
  );
};

export { Chat };
