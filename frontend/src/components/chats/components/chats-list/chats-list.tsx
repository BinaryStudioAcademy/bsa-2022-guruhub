import {
  ChatMessageGetAllItemResponseDto,
  ChatMessageUserResponseDto,
  FC,
} from 'common/types/types';
import { getFormattedDate } from 'helpers/helpers';

import { Chat } from './components/components';
import styles from './styles.module.scss';

type Props = {
  currentUserId: number;
  chatsItems: ChatMessageGetAllItemResponseDto[];
  onChatMessagesLoad: (chatId: string) => void;
};

const ChatsList: FC<Props> = ({
  currentUserId,
  chatsItems,
  onChatMessagesLoad,
}) => {
  const hasChatItems = (length: number): boolean => {
    return Boolean(length);
  };

  return (
    <div className={styles.listWrapper}>
      <h3 className={styles.messagesTitle}>Messages</h3>
      {!hasChatItems(chatsItems.length) ? (
        <h4 className={styles.noChatsTitle}>
          There are no active chats with you for now
        </h4>
      ) : (
        <ul className={styles.chatsList}>
          {chatsItems.map((chat) => {
            const chatOpponent: ChatMessageUserResponseDto =
              chat.sender.id === currentUserId ? chat.receiver : chat.sender;

            return (
              <li key={chat.id}>
                <Chat
                  chatId={chat.chatId}
                  lastMessage={chat.message}
                  messageSenderId={chat.sender.id}
                  currentUserId={currentUserId}
                  chatOpponent={chatOpponent}
                  dateTheLastMessageWasSent={getFormattedDate(
                    chat.createdAt,
                    'distance',
                  )}
                  onClick={onChatMessagesLoad}
                />
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export { ChatsList };
