import { DataStatus } from 'common/enums/enums';
import { ChatMessageUserResponseDto, FC } from 'common/types/types';
import { Spinner } from 'components/common/common';
import { useAppSelector } from 'hooks/hooks';

import { MessageForm, MessagesList } from './components/components';
import styles from './styles.module.scss';

type Props = {
  chatId: string | null;
  chatOpponent: ChatMessageUserResponseDto | null;
  currentUserId: number;
};

const CurrentChat: FC<Props> = ({ chatId, chatOpponent, currentUserId }) => {
  const { currentChatMessages, dataStatus } = useAppSelector(({ chats }) => ({
    currentChatMessages: chats.currentChatMessages,
    dataStatus: chats.currentChatMessagesDataStatus,
  }));

  const hasMessages = Boolean(currentChatMessages.length);

  if (dataStatus === DataStatus.PENDING) {
    return <Spinner />;
  }

  return (
    <div className={styles.currentChatWrapper}>
      <div className={styles.currentChatHeader}>
        {chatOpponent && <h4>{chatOpponent.userDetails.fullName}</h4>}
      </div>
      <div className={styles.currentChatContent}>
        {hasMessages ? (
          <MessagesList
            currentUserId={currentUserId}
            messages={currentChatMessages}
          />
        ) : (
          <h1 className={styles.emptyChatMessage}>
            There is no active chat selected
          </h1>
        )}
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
