import { DataStatus, SearchValue } from 'common/enums/enums';
import {
  FC,
  UsersGetResponseDto,
  UserWithPermissions,
} from 'common/types/types';
import { Spinner } from 'components/common/common';
import { debounce } from 'helpers/helpers';
import {
  useAppDispatch,
  useAppSelector,
  useEffect,
  useUserSearch,
} from 'hooks/hooks';
import { chatsActions } from 'store/actions';

import { ChatsList, CurrentChat, SearchUser } from './components/components';
import styles from './styles.module.scss';

const READ_MESSAGES_DELAY_MS = 500;

const Chats: FC = () => {
  const {
    authDataStatus,
    chatDataStatus,
    lastMessages,
    user,
    chatId,
    chatOpponent,
    emptyChats,
    fetchLastMessagesDataStatus,
    currentChatMessages,
  } = useAppSelector(({ auth, chats }) => ({
    authDataStatus: auth.dataStatus,
    user: auth.user,
    fetchLastMessagesDataStatus: chats.fetchLastMessagesDataStatus,
    chatDataStatus: chats.dataStatus,
    lastMessages: chats.lastMessages,
    emptyChats: chats.emptyChats,
    chatId: chats.currentChatId,
    chatOpponent: chats.chatOpponent,
    currentChatMessages: chats.currentChatMessages,
  }));

  const dispatch = useAppDispatch();

  const handleChatMessagesLoad = (
    selectedChatId: string,
    chatOpponent: UsersGetResponseDto,
  ): void => {
    if (selectedChatId !== chatId) {
      dispatch(chatsActions.getMessages({ id: selectedChatId, chatOpponent }));
    }
  };

  useEffect(() => {
    dispatch(chatsActions.getLastMessages({ fullName: '' }));
  }, [dispatch]);

  const handleReadMessages = (): void => {
    if (chatId) {
      dispatch(chatsActions.readMessages(chatId));
    }
  };

  const debounceHandleReadMessages = debounce(
    handleReadMessages,
    READ_MESSAGES_DELAY_MS,
  );

  useEffect(() => {
    if (chatId) {
      debounceHandleReadMessages();

      return () => {
        debounceHandleReadMessages.clear();
      };
    }
  }, [chatId, currentChatMessages]);

  const { handleSearchPerform, searchParams } = useUserSearch();

  const handleSearch = (search: string): void => {
    handleSearchPerform(SearchValue.FULLNAME, search);
  };

  if (
    chatDataStatus === DataStatus.PENDING ||
    authDataStatus === DataStatus.PENDING
  ) {
    return <Spinner />;
  }

  return (
    <div className={styles.chats}>
      <div className={styles.lastMessagesColumn}>
        <SearchUser searchParams={searchParams} onSearch={handleSearch} />
        <ChatsList
          fetchLastMessagesDataStatus={fetchLastMessagesDataStatus}
          chatsItems={lastMessages}
          emptyChats={emptyChats}
          currentUserId={(user as UserWithPermissions).id}
          onChatMessagesLoad={handleChatMessagesLoad}
        />
      </div>
      <CurrentChat
        chatId={chatId}
        currentUserId={(user as UserWithPermissions).id}
        chatOpponent={chatOpponent}
      />
    </div>
  );
};

export { Chats };
