import { FC } from 'common/types/types';
import { Image } from 'components/common/common';

import styles from './styles.module.scss';

type Props = {
  name: string;
  avatar: string;
};

const ChatOpponent: FC<Props> = ({ name, avatar }) => {
  return (
    <div className={styles.opponent}>
      <Image
        width="40px"
        height="40px"
        src={avatar}
        alt="chat avatar"
        isCircular
        className={styles.opponentAvatar}
      />
      <h4>{name}</h4>
    </div>
  );
};

export { ChatOpponent };
