import { DataStatus } from 'common/enums/enums';
import {
  ChatMessageUserResponseDto,
  FC,
  UserWithPermissions,
} from 'common/types/types';
import { Spinner } from 'components/common/common';
import {
  useAppDispatch,
  useAppSelector,
  useEffect,
  useState,
} from 'hooks/hooks';
import { chatsActions } from 'store/actions';

import { ChatsList, CurrentChat } from './components/components';
import styles from './styles.module.scss';

const Chats: FC = () => {
  const {
    authDataStatus,
    chatDataStatus,
    lastMessages,
    user,
    chatId,
    currentChatMessages,
  } = useAppSelector(({ auth, chats }) => ({
    authDataStatus: auth.dataStatus,
    user: auth.user,
    chatDataStatus: chats.dataStatus,
    lastMessages: chats.lastMessages,
    chatId: chats.currentChatId,
    currentChatMessages: chats.currentChatMessages,
  }));

  const dispatch = useAppDispatch();

  const [chatOpponent, setChatOpponent] = useState<
    ChatMessageUserResponseDto | undefined
  >(undefined);

  useEffect(() => {
    dispatch(chatsActions.getLastMessages());
  }, []);

  if (
    chatDataStatus === DataStatus.PENDING ||
    authDataStatus === DataStatus.PENDING
  ) {
    return <Spinner />;
  }

  const [currentChatMessage] = currentChatMessages;

  if (currentChatMessage) {
    setChatOpponent(
      currentChatMessage.sender.id === (user as UserWithPermissions).id
        ? currentChatMessage.receiver
        : currentChatMessage.sender,
    );
  }

  return (
    user && (
      <div className={styles.chats}>
        <ChatsList chatsList={lastMessages} currentUserId={user.id} />
        <CurrentChat
          chatId={chatId}
          messages={currentChatMessages}
          currentUserId={user.id}
          chatOpponent={chatOpponent}
        />
      </div>
    )
  );
};

export { Chats };
