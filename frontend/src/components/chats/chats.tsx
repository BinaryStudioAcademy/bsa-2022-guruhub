import { DataStatus } from 'common/enums/enums';
import { FC, UserWithPermissions } from 'common/types/types';
import { Spinner } from 'components/common/common';
import { useAppSelector } from 'hooks/hooks';

import { ChatsList } from './components/components';
import styles from './styles.module.scss';

const Chats: FC = () => {
  const { lastMessages, dataStatus: chatDataStatus } = useAppSelector(
    (state) => state.chats,
  );
  const { user, dataStatus: authDataStatus } = useAppSelector(
    (state) => state.auth,
  );

  if (
    chatDataStatus === DataStatus.PENDING ||
    authDataStatus === DataStatus.PENDING
  ) {
    return <Spinner />;
  }

  return (
    <div className={styles.chats}>
      <ChatsList
        chatsList={lastMessages}
        currentUserId={(user as UserWithPermissions).id}
      />
    </div>
  );
};

export { Chats };
