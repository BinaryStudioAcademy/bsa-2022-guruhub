import { DataStatus } from 'common/enums/enums';
import { FC, UsersGetResponseDto } from 'common/types/types';
import { Spinner } from 'components/common/common';
import { useAppSelector } from 'hooks/hooks';

import {
  ChatOpponent,
  MessageForm,
  MessagesList,
} from './components/components';
import styles from './styles.module.scss';

type Props = {
  chatId: string | null;
  chatOpponent: UsersGetResponseDto | null;
  currentUserId: number;
};

const CurrentChat: FC<Props> = ({ chatId, chatOpponent, currentUserId }) => {
  const { currentChatMessages, dataStatus } = useAppSelector(({ chats }) => ({
    currentChatMessages: chats.currentChatMessages,
    dataStatus: chats.currentChatMessagesDataStatus,
  }));

  if (!chatId) {
    return (
      <h1 className={styles.emptyChatMessage}>
        There is no active chat selected
      </h1>
    );
  }

  if (dataStatus === DataStatus.PENDING) {
    return <Spinner />;
  }

  return (
    <div className={styles.currentChatWrapper}>
      <div className={styles.currentChatHeader}>
        {chatOpponent && (
          <ChatOpponent
            name={chatOpponent.userDetails.fullName}
            avatar={chatOpponent.userDetails.avatar?.url}
          />
        )}
      </div>
      <div className={styles.currentChatContent}>
        <MessagesList
          currentUserId={currentUserId}
          messages={currentChatMessages}
        />
      </div>
      <div className={styles.currentChatFooter}>
        {chatOpponent && (
          <MessageForm chatId={chatId} chatOpponentId={chatOpponent.id} />
        )}
      </div>
    </div>
  );
};

export { CurrentChat };
