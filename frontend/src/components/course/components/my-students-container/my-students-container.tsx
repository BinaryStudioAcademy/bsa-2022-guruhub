import defaultUserAvatar from 'assets/img/avatar-default.svg';
import { AppRoute } from 'common/enums/enums';
import { FC, UsersGetResponseDto } from 'common/types/types';
import { Image, Link } from 'components/common/common';
import { generateDynamicPath, generateTelegramLink } from 'helpers/helpers';

import styles from './styles.module.scss';

type Props = {
  mentees: UsersGetResponseDto[];
  courseId: number;
};

const MyStudentsContainer: FC<Props> = ({ mentees, courseId }) => {
  const hasMentees = Boolean(mentees.length);

  return (
    <div className={styles.studentsWrapper}>
      <h2 className={styles.studentsTitle}>My Students</h2>
      {hasMentees ? (
        mentees.map(({ id, userDetails, email }) => (
          <Link
            to={generateDynamicPath(AppRoute.STUDENTS_$ID_COURSES_$ID, {
              studentId: id,
              courseId,
            })}
            key={id}
          >
            <div className={styles.student}>
              <div className={styles.imageWrapper}>
                <Image
                  width="75"
                  height="75"
                  src={userDetails.avatar?.url ?? defaultUserAvatar}
                  alt="user avatar"
                  isCircular
                />
              </div>
              <div className={styles.studentData}>
                <p className={styles.text}>{userDetails.fullName}</p>
                <p className={styles.contacts}>{email}</p>
                {userDetails.telegramUsername && (
                  <a
                    href={generateTelegramLink(userDetails.telegramUsername)}
                    className={styles.telegramLink}
                  >
                    @{userDetails.telegramUsername}
                  </a>
                )}
              </div>
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
