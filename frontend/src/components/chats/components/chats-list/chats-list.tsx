import { DataStatus } from 'common/enums/enums';
import {
  ChatMessageGetAllItemResponseDto,
  ChatMessageGetEmptyChatDto,
  FC,
  UsersGetResponseDto,
} from 'common/types/types';
import { Spinner } from 'components/common/common';
import { getFormattedDate } from 'helpers/helpers';

import { Chat } from './components/components';
import styles from './styles.module.scss';

type Props = {
  currentUserId: number;
  chatsItems: ChatMessageGetAllItemResponseDto[];
  emptyChats: ChatMessageGetEmptyChatDto[];
  onChatMessagesLoad: (
    chatId: string,
    chatOpponent: UsersGetResponseDto,
  ) => void;
  fetchLastMessagesDataStatus: DataStatus;
};

const ChatsList: FC<Props> = ({
  currentUserId,
  chatsItems,
  onChatMessagesLoad,
  emptyChats,
  fetchLastMessagesDataStatus,
}) => {
  const hasChatItems = Boolean(chatsItems.length) || Boolean(emptyChats.length);

  if (fetchLastMessagesDataStatus === DataStatus.PENDING) {
    return <Spinner />;
  }

  return (
    <div className={styles.listWrapper}>
      <h3 className={styles.messagesTitle}>Messages</h3>
      {!hasChatItems ? (
        <h4 className={styles.noChatsTitle}>
          There are no active chats with you for now
        </h4>
      ) : (
        <ul className={styles.chatsList}>
          {chatsItems.map((chat) => {
            const chatOpponent: UsersGetResponseDto =
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

          {emptyChats.map((chat) => {
            return (
              <li key={chat.chatId}>
                <Chat
                  chatId={chat.chatId}
                  chatOpponent={chat.receiver}
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
