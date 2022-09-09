import React, { FC } from 'react';

import { AppScreenName, DataStatus } from '~/common/enums/enums';
import { UserWithPermissions } from '~/common/types/types';
import { Search, Spinner, View } from '~/components/common/common';
import {
  useAppDispatch,
  useAppNavigate,
  useAppSelector,
  useEffect,
  useState,
} from '~/hooks/hooks';
import { chatActions } from '~/store/actions';

import { ConversationsList } from './components/components';
import { styles } from './styles';

const Chat: FC = () => {
  const [searchValue, setSearchValue] = useState('');
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

  const handleSearch = (search: string): void => {
    setSearchValue(search);
  };

  useEffect(() => {
    dispatch(chatActions.getLastMessages({ fullName: '' }));
  }, [dispatch]);

  useEffect(() => {
    dispatch(chatActions.getLastMessages({ fullName: searchValue }));
  }, [dispatch, searchValue]);

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
    </>
  );
};

export { Chat };
