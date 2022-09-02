import { FC } from 'common/types/types';
import { Image } from 'components/common/common';

import styles from './style.module.scss';

type Props = {
  messageAuthor: 'user' | 'opponent';
  content: string;
  postTime: string;
  avatarUrl: string;
};

const Message: FC<Props> = ({
  messageAuthor,
  content,
  postTime,
  avatarUrl,
}) => {
  return (
    <div className={styles.messageCardWrapper}>
      <div className={styles[`${messageAuthor}Author`]}>
        <div className={styles.userAvatarWrapper}>
          <Image width="10px" height="10px" src={avatarUrl} alt="chat avatar" />
        </div>
        <p className={styles.messageWrapper}>{content}</p>
      </div>
      <p className={styles.messageTimePost}>{postTime}</p>
    </div>
  );
};

export { Message };
