import defaultAvatar from 'assets/img/avatar-default.svg';
import { ChatMessageGetAllItemResponseDto, FC } from 'common/types/types';
import { getFormattedDate } from 'helpers/helpers';

import { DateSeparator, Message } from './components/components';
import styles from './styles.module.scss';

type Props = {
  currentUserId: number;
  messages: ChatMessageGetAllItemResponseDto[];
};

const MessagesList: FC<Props> = ({ messages, currentUserId }) => {
  const msgs: JSX.Element[] = [];
  const filteredMsgs: JSX.Element[] = [];

  messages.map((message) => {
    msgs.push(
      <Message
        messageAuthor={
          message.sender.id === currentUserId ? 'user' : 'opponent'
        }
        content={message.message}
        postTime={getFormattedDate(message.createdAt, 'HH:mm')}
        originalPostTime={getFormattedDate(message.createdAt, 'yyyy-MM-dd')}
        messageAvatarUrl={
          message.sender.userDetails.avatar?.url ?? defaultAvatar
        }
      />,
    );
  });

  msgs.reverse().reduce((prev, current) => {
    if (prev.props.originalPostTime !== current.props.originalPostTime) {
      filteredMsgs.push(
        <DateSeparator postTime={prev.props.originalPostTime} />,
      );
    }
    filteredMsgs.push(current);

    return current;
  });

  const messagesWithSeparators = filteredMsgs.reverse();

  messagesWithSeparators.unshift(
    <DateSeparator postTime={msgs[msgs.length - 1].props.originalPostTime} />,
  );
  messagesWithSeparators.push(msgs[0]);

  return (
    <div className={styles.messagesListWrapper}>
      {messagesWithSeparators.map((item, idx) => {
        return (
          <div key={idx} className={styles.messageWrapper}>
            {item}
          </div>
        );
      })}
    </div>
  );
};
export { MessagesList };
