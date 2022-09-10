import { AppRoute, DataStatus, SearchValue } from 'common/enums/enums';
import { FC, UserWithPermissions } from 'common/types/types';
import { Spinner } from 'components/common/common';
import {
  useAppDispatch,
  useAppSelector,
  useEffect,
  useNavigate,
  useUserSearch,
} from 'hooks/hooks';
import { chatsActions } from 'store/actions';

import { ChatsList, CurrentChat, SearchUser } from './components/components';
import styles from './styles.module.scss';

const Chats: FC = () => {
  const {
    authDataStatus,
    chatDataStatus,
    lastMessages,
    user,
    chatId,
    currentChatMessages,
    chatOpponent,
    fetchLastMessagesDataStatus,
  } = useAppSelector(({ auth, chats }) => ({
    authDataStatus: auth.dataStatus,
    user: auth.user,
    fetchLastMessagesDataStatus: chats.fetchLastMessagesDataStatus,
    chatDataStatus: chats.dataStatus,
    lastMessages: chats.lastMessages,
    chatId: chats.currentChatId,
    currentChatMessages: chats.currentChatMessages,
    chatOpponent: chats.chatOpponent,
  }));

  const navigate = useNavigate();

  if (!user) {
    navigate(AppRoute.ROOT);
  }

  const dispatch = useAppDispatch();

  const handleChatMessagesLoad = (chatId: string): void => {
    dispatch(chatsActions.getMessages({ id: chatId }));
  };

  useEffect(() => {
    dispatch(chatsActions.getLastMessages({ fullName: '' }));
  }, [dispatch]);

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
          currentUserId={(user as UserWithPermissions).id}
          onChatMessagesLoad={handleChatMessagesLoad}
        />
      </div>
      <CurrentChat
        chatId={chatId}
        messages={currentChatMessages}
        currentUserId={(user as UserWithPermissions).id}
        chatOpponent={chatOpponent}
      />
    </div>
  );
};

export { Chats };
