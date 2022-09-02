import { FC } from 'common/types/types';
import { ChatMessageGetAllItemResponseDto } from 'guruhub-shared';

import styles from './styles.module.scss';

type Props = {
  chatOpponentName: string;
  messages: ChatMessageGetAllItemResponseDto[];
};

const CurrentChat: FC<Props> = ({ chatOpponentName }) => {
  return (
    <div className={styles.currentChatWrapper}>
      <div className={styles.currentChatHeader}>
        <h5>{chatOpponentName}</h5>
      </div>
      <div className={styles.currentChatContent}></div>
      <div className={styles.currentChatFooter}></div>
    </div>
  );
};

export { CurrentChat };
