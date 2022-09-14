import defaultAvatar from 'assets/img/avatar-default.svg';
import { FC, UsersGetResponseDto } from 'common/types/types';
import { Image } from 'components/common/common';
import { getValidClasses } from 'helpers/helpers';
import { useAppSelector } from 'hooks/hooks';

import styles from './styles.module.scss';

type Props = {
  chatId: string;
  currentUserId?: number;
  messageSenderId?: number;
  chatOpponent: UsersGetResponseDto;
  lastMessage?: string;
  dateTheLastMessageWasSent?: string;
  onClick: (chatId: string, chatOpponent: UsersGetResponseDto) => void;
};

const Chat: FC<Props> = ({
  chatId,
  currentUserId,
  messageSenderId,
  chatOpponent,
  lastMessage,
  dateTheLastMessageWasSent,
  onClick,
}) => {
  const { currentChatId } = useAppSelector(({ chats }) => ({
    currentChatId: chats.currentChatId,
  }));
  const handleChatMessagesLoad = (): void => {
    onClick(chatId, chatOpponent);
  };

  return (
    <button
      type="button"
      className={getValidClasses(
        styles.chat,
        currentChatId === chatId && styles.selected,
      )}
      onClick={handleChatMessagesLoad}
    >
      <Image
        width="40px"
        height="40px"
        src={chatOpponent.userDetails.avatar?.url ?? defaultAvatar}
        alt="chat user avatar"
        isCircular
      />
      <div className={styles.chatContentWrapper}>
        <div className={styles.chatOpponentAndDateLastMessageWasSentWrapper}>
          <p
            className={getValidClasses(
              styles.chatOpponentFullName,
              lastMessage ?? styles.marginTopZero,
            )}
          >
            {chatOpponent.userDetails.fullName}
          </p>
          <p className={styles.dateTheLastMessageWasSent}>
            {dateTheLastMessageWasSent}
          </p>
        </div>
        <div className={styles.lastMessageWrapper}>
          {messageSenderId && currentUserId && (
            <p className={styles.lastMessage}>{`${
              messageSenderId === currentUserId ? 'You:' : ''
            } ${lastMessage}`}</p>
          )}
        </div>
      </div>
    </button>
  );
};

export { Chat };
