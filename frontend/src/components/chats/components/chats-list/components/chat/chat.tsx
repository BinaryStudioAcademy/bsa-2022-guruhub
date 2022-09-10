import defaultAvatar from 'assets/img/avatar-default.svg';
import { ChatMessageUserResponseDto, FC } from 'common/types/types';
import { Image } from 'components/common/common';
import { getValidClasses } from 'helpers/helpers';
import { useAppSelector } from 'hooks/hooks';

import styles from './styles.module.scss';

type Props = {
  chatId: string;
  currentUserId: number;
  messageSenderId: number;
  chatOpponent: ChatMessageUserResponseDto;
  lastMessage: string;
  dateTheLastMessageWasSent: string;
  onClick: (chatId: string) => void;
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
    onClick(chatId);
  };

  return (
    <div
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
          <p className={styles.chatOpponentFullName}>
            {chatOpponent.userDetails.fullName}
          </p>
          <p className={styles.dateTheLastMessageWasSent}>
            {dateTheLastMessageWasSent}
          </p>
        </div>
        <div className={styles.lastMessageWrapper}>
          <p className={styles.lastMessage}>{`${
            messageSenderId === currentUserId ? 'You:' : ''
          } ${lastMessage}`}</p>
        </div>
      </div>
    </div>
  );
};

export { Chat };
