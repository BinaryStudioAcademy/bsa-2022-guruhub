import defaultUserAvatar from 'assets/img/avatar-default.svg';
import { FC, UserDetailsResponseDto } from 'common/types/types';
import { Image } from 'components/common/common';

import styles from './styles.module.scss';

type Props = {
  mentees: UserDetailsResponseDto[];
};

const MyStudentsContainer: FC<Props> = ({ mentees }) => {
  const hasMentees = Boolean(mentees.length);

  return (
    <div className={styles.studentsWrapper}>
      <h2 className={styles.studentsTitle}>My Students</h2>
      {hasMentees ? (
        mentees.map(({ id, fullName, avatar }) => (
          <div key={id} className={styles.student}>
            <div className={styles.imageWrapper}>
              <Image
                width="74"
                height="74"
                src={avatar?.url ?? defaultUserAvatar}
                alt="user avatar"
                isCircular
              />
            </div>
            <p className={styles.text}>{fullName}</p>
          </div>
        ))
      ) : (
        <p className={styles.placeholder}>There are no students yet...</p>
      )}
    </div>
  );
};

export { MyStudentsContainer };
