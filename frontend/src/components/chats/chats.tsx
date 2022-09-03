import { DataStatus, SearchValue } from 'common/enums/enums';
import { FC, UserWithPermissions } from 'common/types/types';
import { Spinner } from 'components/common/common';
import {
  useAppDispatch,
  useAppSelector,
  useEffect,
  useUserSearch,
} from 'hooks/hooks';
import { chatsActions } from 'store/actions';

import { ChatsList, SearchUser } from './components/components';
import styles from './styles.module.scss';

const Chats: FC = () => {
  const dispatch = useAppDispatch();
  const { authDataStatus, chatDataStatus, lastMessages, user } = useAppSelector(
    ({ auth, chats }) => ({
      authDataStatus: auth.dataStatus,
      user: auth.user,
      chatDataStatus: chats.dataStatus,
      lastMessages: chats.lastMessages,
    }),
  );

  useEffect(() => {
    dispatch(chatsActions.getLastMessages({ fullName: '' }));
  }, [dispatch]);

  const { performSearch, searchParams } = useUserSearch();

  const handleSearch = (search: string): void => {
    performSearch(SearchValue.FULLNAME, search);
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
          chatsList={lastMessages}
          currentUserId={(user as UserWithPermissions).id}
        />
      </div>
    </div>
  );
};

export { Chats };
