import {
  ChatMessageGetAllItemResponseDto,
  ChatMessageUserResponseDto,
  FC,
} from 'common/types/types';

import { MessageForm, MessagesList } from './components/components';
import styles from './styles.module.scss';

type Props = {
  chatId: string | null;
  chatOpponent: ChatMessageUserResponseDto | undefined;
  currentUserId: number;
  messages: ChatMessageGetAllItemResponseDto[];
};

const CurrentChat: FC<Props> = ({
  chatId,
  chatOpponent,
  currentUserId,
  messages,
}) => {
  return (
    <div className={styles.currentChatWrapper}>
      <div className={styles.currentChatHeader}>
        <h4>ABCS</h4>
        {chatOpponent && <h4>{chatOpponent.userDetails.fullName}</h4>}
      </div>
      <div className={styles.currentChatContent}>
        <MessagesList currentUserId={currentUserId} messages={messages} />
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
