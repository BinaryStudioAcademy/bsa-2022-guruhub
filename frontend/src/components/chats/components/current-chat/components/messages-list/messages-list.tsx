import defaultAvatar from 'assets/img/avatar-default.svg';
import { ChatMessageGetAllItemResponseDto, FC } from 'common/types/types';
import { getFormattedDate } from 'helpers/helpers';

import { Message } from './components/components';
import styles from './styles.module.scss';

type Props = {
  currentUserId: number;
  messages: ChatMessageGetAllItemResponseDto[];
};

const MessagesList: FC<Props> = ({ messages, currentUserId }) => {
  return (
    <div className={styles.messagesListWrapper}>
      {messages.map((message) => {
        return (
          <div key={message.id} className={styles.messageWrapper}>
            <Message
              messageAuthor={
                message.sender.id === currentUserId ? 'user' : 'opponent'
              }
              content={message.message}
              postTime={getFormattedDate(message.createdAt, 'HH:mm')}
              messageAvatarUrl={
                message.sender.userDetails.avatarUrl ?? defaultAvatar
              }
            />
          </div>
        );
      })}
    </div>
  );
};
export { MessagesList };
