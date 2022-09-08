import defaultUserAvatar from 'assets/img/avatar-default.svg';
import { AppRoute } from 'common/enums/enums';
import { FC, UserDetailsResponseDto } from 'common/types/types';
import { Image, Link } from 'components/common/common';
import { generateDynamicPath } from 'helpers/helpers';

import styles from './styles.module.scss';

type Props = {
  mentees: UserDetailsResponseDto[];
  courseId: number;
};

const MyStudentsContainer: FC<Props> = ({ mentees, courseId }) => {
  const hasMentees = Boolean(mentees.length);

  return (
    <div className={styles.studentsWrapper}>
      <h2 className={styles.studentsTitle}>My Students</h2>
      {hasMentees ? (
        mentees.map(({ id, fullName, avatar }) => (
          <Link
            to={generateDynamicPath(AppRoute.STUDENTS_$ID_COURSES_$ID, {
              studentId: id,
              courseId,
            })}
          >
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
          </Link>
        ))
      ) : (
        <p className={styles.placeholder}>There are no students yet...</p>
      )}
    </div>
  );
};

export { MyStudentsContainer };
