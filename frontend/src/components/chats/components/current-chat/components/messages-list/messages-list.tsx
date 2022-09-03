import defaultAvatar from 'assets/img/avatar-default.svg';
import { ChatMessageGetAllItemResponseDto, FC } from 'common/types/types';

import { Message } from './components/components';
import styles from './styles.module.scss';

type Props = {
  currentUserId: number;
  messages: ChatMessageGetAllItemResponseDto[];
};

const MessagesList: FC<Props> = ({ currentUserId, messages }) => {
  return (
    <div className={styles.messagesListWrapper}>
      {messages.map((message) => {
        return (
          <Message
            messageAuthor={
              message.sender.id === currentUserId ? 'user' : 'opponent'
            }
            content={message.message}
            postTime={message.createdAt}
            messageAvatarUrl={
              message.sender.userDetails.avatarUrl ?? defaultAvatar
            }
          />
        );
      })}
    </div>
  );
};
export { MessagesList };
