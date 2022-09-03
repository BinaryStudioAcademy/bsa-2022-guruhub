import defaultAvatar from 'assets/img/avatar-default.svg';
import {
  ChatMessageGetAllItemResponseDto,
  FC,
  UserDetailsResponseDto,
} from 'common/types/types';
import { getFormattedDate } from 'helpers/helpers';

import { Chat } from './components/components';
import styles from './styles.module.scss';

type Props = {
  currentUserId: number;
  chatsList: ChatMessageGetAllItemResponseDto[];
};

const ChatsList: FC<Props> = ({ currentUserId, chatsList }) => {
  return (
    <div className={styles.listWrapper}>
      <h3 className={styles.messagesTitle}>Messages</h3>
      {!chatsList.length ? (
        <h4 className={styles.noChatsTitle}>
          There are no active chats with you for now
        </h4>
      ) : (
        <ol className={styles.chatsList}>
          {chatsList.map((chat) => {
            const chatOpponent: UserDetailsResponseDto =
              chat.sender.id === currentUserId
                ? chat.receiver.userDetails
                : chat.sender.userDetails;

            return (
              <li key={chat.id}>
                <Chat
                  lastMessage={chat.message}
                  chatOpponentAvatarSrc={
                    chatOpponent.avatarUrl ?? defaultAvatar
                  }
                  chatOpponentFullName={chatOpponent.fullName}
                  dateTheLastMessageWasSent={getFormattedDate(
                    chat.createdAt,
                    'distance',
                  )}
                />
              </li>
            );
          })}
        </ol>
      )}
    </div>
  );
};

export { ChatsList };
