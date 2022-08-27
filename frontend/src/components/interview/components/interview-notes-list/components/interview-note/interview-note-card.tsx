import defaultAvatar from 'assets/img/avatar-default.svg';
import { FC } from 'common/types/types';
import { Content, Image } from 'components/common/common';

import styles from './styles.module.scss';

type Props = {
  note: string;
  authorName: string;
  postDate: string;
};

const InterviewNoteCard: FC<Props> = ({
  note,
  authorName,
  postDate,
}: Props) => {
  return (
    <div className={styles.card}>
      <div className={styles.cardContentWrapper}>
        <Content html={note} />
        <div>{postDate}</div>
      </div>
      <div className={styles.cardAuthorSection}>
        <Image
          width="20px"
          height="20px"
          src={defaultAvatar}
          alt="Author avatar"
          isCircular
        />
        <div>{authorName}</div>
      </div>
    </div>
  );
};

export { InterviewNoteCard };
