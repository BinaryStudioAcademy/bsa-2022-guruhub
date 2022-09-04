import { DataStatus } from 'common/enums/enums';
import { FC } from 'common/types/types';
import { Spinner } from 'components/common/common';
import { useAppDispatch, useAppSelector, useEffect } from 'hooks/hooks';
import { chatsActions } from 'store/actions';

import { ChatsList, CurrentChat } from './components/components';
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
  } = useAppSelector(({ auth, chats }) => ({
    authDataStatus: auth.dataStatus,
    user: auth.user,
    chatDataStatus: chats.dataStatus,
    lastMessages: chats.lastMessages,
    chatId: chats.currentChatId,
    currentChatMessages: chats.currentChatMessages,
    chatOpponent: chats.chatOpponent,
  }));

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(chatsActions.getLastMessages());
  }, []);

  const handleChatMessagesLoad = (chatId: string): void => {
    dispatch(chatsActions.getMessages({ id: chatId }));
  };

  if (
    chatDataStatus === DataStatus.PENDING ||
    authDataStatus === DataStatus.PENDING
  ) {
    return <Spinner />;
  }

  return (
    user && (
      <div className={styles.chats}>
        <ChatsList
          chatsList={lastMessages}
          currentUserId={user.id}
          onChatMessagesLoad={handleChatMessagesLoad}
        />
        <CurrentChat
          chatId={chatId}
          messages={currentChatMessages}
          currentUserId={user.id}
          chatOpponent={chatOpponent}
        />
      </div>
    )
  );
};

export { Chats };
