import defaultUserAvatar from 'assets/img/avatar-default.svg';
import { FC, UsersGetResponseDto } from 'common/types/types';
import { Button, Image } from 'components/common/common';
import { generateTelegramLink } from 'helpers/helpers';

import styles from './styles.module.scss';

type Props = {
  mentor: UsersGetResponseDto;
  onMentorChange: () => void;
};

const MyMentor: FC<Props> = ({ mentor, onMentorChange }) => {
  const hasTelegram = Boolean(mentor.userDetails.telegramUsername);

  return (
    <div>
      <h2>My Mentor</h2>
      <div className={styles.mentorCard}>
        <div className={styles.mentorInfo}>
          <Image
            width="75"
            height="75"
            alt="mentor"
            isCircular
            src={mentor.userDetails.avatar?.url ?? defaultUserAvatar}
          />
          <div className={styles.mentorData}>
            <p className={styles.mentorName}>{mentor.userDetails.fullName}</p>
            <p className={styles.mentorContacts}>{mentor.email}</p>
            {hasTelegram && (
              <a
                href={generateTelegramLink(
                  mentor.userDetails.telegramUsername as string,
                )}
                className={styles.telegramLink}
              >
                @{mentor.userDetails.telegramUsername}
              </a>
            )}
          </div>
        </div>
        <div className={styles.changeMentor}>
          <div className={styles.buttonWrapper}>
            <Button
              label="Change Mentor"
              btnColor="gray"
              onClick={onMentorChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export { MyMentor };
