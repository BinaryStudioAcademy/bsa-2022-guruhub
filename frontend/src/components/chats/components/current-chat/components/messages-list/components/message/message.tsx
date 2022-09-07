import { FC } from 'common/types/types';
import { Image } from 'components/common/common';
import { getValidClasses } from 'helpers/helpers';

import styles from './style.module.scss';

type Props = {
  messageAuthor: 'user' | 'opponent';
  content: string;
  postTime: string;
  originalPostTime?: string;
  messageAvatarUrl: string;
};

const Message: FC<Props> = ({
  messageAuthor,
  content,
  postTime,
  messageAvatarUrl,
}) => {
  return (
    <div
      className={getValidClasses(
        styles.messageCardWrapper,
        styles[`${messageAuthor}Author`],
      )}
    >
      <div className={styles.innerWrapper}>
        <div className={styles.userAvatarWrapper}>
          <Image
            width="25px"
            height="25px"
            src={messageAvatarUrl}
            alt="chat avatar"
          />
        </div>
        <p className={styles.messageWrapper}>{content}</p>
      </div>
      <div className={styles.postDateWrapper}>
        <p className={styles.messageTimePost}>{postTime}</p>
      </div>
    </div>
  );
};

export { Message };
