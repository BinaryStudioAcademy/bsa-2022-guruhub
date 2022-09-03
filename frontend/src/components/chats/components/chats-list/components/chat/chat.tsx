import { FC } from 'common/types/types';
import { Image } from 'components/common/common';

import styles from './styles.module.scss';

type Props = {
  chatOpponentFullName: string;
  chatOpponentAvatarSrc: string;
  lastMessage: string;
  dateTheLastMessageWasSent: string;
};

const Chat: FC<Props> = ({
  chatOpponentFullName,
  chatOpponentAvatarSrc: chatOpponentAvatarUrl,
  lastMessage,
  dateTheLastMessageWasSent,
}) => {
  return (
    <div className={styles.chat}>
      <Image
        width="40px"
        height="40px"
        src={chatOpponentAvatarUrl}
        alt="chat user avatar"
        isCircular
      />
      <div className={styles.chatContentWrapper}>
        <div className={styles.chatOpponentAndDateLastMessageWasSentWrapper}>
          <p className={styles.chatOpponentFullName}>{chatOpponentFullName}</p>
          <p className={styles.dateTheLastMessageWasSent}>
            {dateTheLastMessageWasSent}
          </p>
        </div>
        <div className={styles.lastMessageWrapper}>
          <p className={styles.lastMessage}>{lastMessage}</p>
        </div>
      </div>
    </div>
  );
};

export { Chat };
