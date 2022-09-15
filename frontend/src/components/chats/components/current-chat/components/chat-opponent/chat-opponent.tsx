import defaultAvatar from 'assets/img/avatar-default.svg';
import { FC } from 'common/types/types';
import { Image } from 'components/common/common';

import styles from './styles.module.scss';

type Props = {
  name: string;
  avatar: string | undefined;
};

const ChatOpponent: FC<Props> = ({ name, avatar }) => {
  return (
    <div className={styles.opponent}>
      <Image
        width="40px"
        height="40px"
        src={avatar ?? defaultAvatar}
        alt="chat avatar"
        isCircular
        classes={styles.opponentAvatar}
      />
      <h4>{name}</h4>
    </div>
  );
};

export { ChatOpponent };
