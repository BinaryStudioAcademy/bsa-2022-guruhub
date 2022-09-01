import defaultAvatar from 'assets/img/avatar-default.svg';
import { TaskStatus } from 'common/enums/enums';
import { FC, UsersGetResponseDto } from 'common/types/types';
import { Content, Image } from 'components/common/common';
import { getFormattedDate } from 'helpers/helpers';

import styles from './styles.module.scss';

type Props = {
  note: string;
  author: UsersGetResponseDto;
  createdAt: string;
  status: TaskStatus;
};

const TaskNoteCard: FC<Props> = ({ note, author, createdAt }) => {
  return (
    <div className={styles.card}>
      <div className={styles.cardContentWrapper}>
        <Content html={note} />
        <div className={styles.postDateSection}>
          <div>{getFormattedDate(createdAt, 'HH:mm, dd.MM')}</div>
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
        <div className={styles.authorNameSection}>
          {author.userDetails.fullName}
        </div>
      </div>
    </div>
  );
};

export { TaskNoteCard };
