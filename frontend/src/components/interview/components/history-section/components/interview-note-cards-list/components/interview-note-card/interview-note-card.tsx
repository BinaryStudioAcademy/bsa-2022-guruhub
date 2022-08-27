import defaultAvatar from 'assets/img/avatar-default.svg';
import { FC } from 'common/types/types';
import { Content, Image } from 'components/common/common';

import styles from './styles.module.scss';

type Props = {
  note: string;
  authorName: string;
  postDate: string;
};

const InterviewNoteCard: FC<Props> = ({ note, authorName, postDate }) => {
  const notePostDate = new Date(postDate);
  const notePostHours = notePostDate.getHours();
  const notePostMinutes = notePostDate.getMinutes();
  const notePostDay = notePostDate.getDate();
  const notePostMonth = notePostDate.getMonth() + 1;

  return (
    <div className={styles.card}>
      <div className={styles.cardContentWrapper}>
        <Content html={note} />
        <div className={styles.postDateSection}>
          <div>
            {notePostHours}:{notePostMinutes}, {notePostDay}.
            {notePostMonth > 10 ? notePostMonth : `0${notePostMonth}`}
          </div>
        </div>
      </div>
      <div className={styles.cardAuthorSection}>
        <Image
          width="30px"
          height="30px"
          src={defaultAvatar}
          alt="Author avatar"
          isCircular
        />
        <div className={styles.authorNameSection}>{authorName}</div>
      </div>
    </div>
  );
};

export { InterviewNoteCard };
