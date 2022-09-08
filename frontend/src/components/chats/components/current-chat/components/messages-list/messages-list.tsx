import defaultAvatar from 'assets/img/avatar-default.svg';
import { ChatMessageGetAllItemResponseDto, FC } from 'common/types/types';
import { getFormattedDate } from 'helpers/helpers';

import { DateSeparator, Message } from './components/components';
import { groupMessagesByDate } from './helpers/group-messages-by-date.helper';
import styles from './styles.module.scss';

type Props = {
  currentUserId: number;
  messages: ChatMessageGetAllItemResponseDto[];
};

const MessagesList: FC<Props> = ({ messages, currentUserId }) => {
  const groupedByDateMessages = groupMessagesByDate(messages);
  const messagesToDisplay = Object.entries(groupedByDateMessages).map(
    (group) => {
      const [groupingDate, groupedMessages] = group;

      return (
        <div key={groupingDate}>
          <DateSeparator postTime={groupingDate} />
          {groupedMessages.map((message) => {
            return (
              <div key={message.id} className={styles.messageWrapper}>
                <Message
                  messageAuthor={
                    message.sender.id === currentUserId ? 'user' : 'opponent'
                  }
                  content={message.message}
                  postTime={getFormattedDate(message.createdAt, 'HH:mm')}
                  messageAvatarUrl={
                    message.sender.userDetails.avatar?.url ?? defaultAvatar
                  }
                />
              </div>
            );
          })}
        </div>
      );
    },
  );

  return <div className={styles.messagesListWrapper}>{messagesToDisplay}</div>;
};
export { MessagesList };
