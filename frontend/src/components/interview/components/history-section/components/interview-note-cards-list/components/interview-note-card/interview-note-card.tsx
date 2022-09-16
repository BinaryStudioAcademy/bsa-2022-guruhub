import { FC } from 'common/types/types';
import { Image } from 'components/common/common';
import { getFormattedDate } from 'helpers/helpers';

import styles from './styles.module.scss';

type Props = {
  note: string;
  authorName: string;
  postDate: string;
  authorAvatar: string;
};

const InterviewNoteCard: FC<Props> = ({
  note,
  authorName,
  postDate,
  authorAvatar,
}) => {
  return (
    <div className={styles.card}>
      <p className={styles.noteContent}>{note}</p>
      <div className={styles.cardInfoWrapper}>
        <div className={styles.cardAuthorSection}>
          <Image
            width="30px"
            height="30px"
            src={authorAvatar}
            alt="Author avatar"
            isCircular
          />
          <div className={styles.authorNameSection}>{authorName}</div>
        </div>
        <div className={styles.postDateSection}>
          <div>{getFormattedDate(postDate, 'HH:mm, dd.MM')}</div>
        </div>
      </div>
    </div>
  );
};

export { InterviewNoteCard };
