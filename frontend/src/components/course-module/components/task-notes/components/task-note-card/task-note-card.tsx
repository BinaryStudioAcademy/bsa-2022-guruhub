import defaultAvatar from 'assets/img/avatar-default.svg';
import { TaskStatus } from 'common/enums/enums';
import { FC, UsersGetResponseDto } from 'common/types/types';
import { Image } from 'components/common/common';
import { getFormattedDate, getValidClasses } from 'helpers/helpers';

import styles from './styles.module.scss';

type Props = {
  note: string;
  author: UsersGetResponseDto;
  createdAt: string;
  status: TaskStatus;
};

const TaskNoteCard: FC<Props> = ({ note, author, createdAt, status }) => {
  return (
    <div className={styles.card}>
      <div className={styles.cardContentWrapper}>
        <span className={styles.noteContent}>{note}</span>
        <span>{getFormattedDate(createdAt, 'HH:mm, dd.MM')}</span>
      </div>
      <div className={styles.additionalInfoWrapper}>
        <div className={styles.cardAuthorSection}>
          <Image
            width="30px"
            height="30px"
            src={defaultAvatar}
            alt="Author avatar"
            isCircular
          />
          <div className={styles.authorNameSection}>
            {author.userDetails.fullName}
          </div>
        </div>
        <div className={styles.statusWrapper}>
          <span className={getValidClasses(styles.status, styles[status])}>
            {status}
          </span>
        </div>
      </div>
    </div>
  );
};

export { TaskNoteCard };
