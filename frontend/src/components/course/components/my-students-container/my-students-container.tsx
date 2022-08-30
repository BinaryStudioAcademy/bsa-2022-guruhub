import defaultUserAvatar from 'assets/img/avatar-default.svg';
import { FC, UserDetailsResponseDto } from 'common/types/types';
import { Image } from 'components/common/common';

import styles from './styles.module.scss';

type Props = {
  mentees: UserDetailsResponseDto[];
};

const MyStudentsContainer: FC<Props> = ({ mentees }) => {
  if (mentees.length === 0) {
    return <p className={styles.studentsTitle}>There are no students yet...</p>;
  }

  return (
    <div className={styles.studentsWrapper}>
      <h2 className={styles.studentsTitle}>My Students</h2>
      {mentees.map(({ id, fullName, avatarUrl }) => (
        <div key={id} className={styles.student}>
          <div className={styles.imageWrapper}>
            <Image
              width="74"
              height="74"
              src={avatarUrl ?? defaultUserAvatar}
              alt="user avatar"
              isCircular
            />
          </div>
          <p className={styles.text}>{fullName}</p>
        </div>
      ))}
    </div>
  );
};

export { MyStudentsContainer };
