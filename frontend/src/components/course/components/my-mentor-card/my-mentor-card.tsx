import defaultUserAvatar from 'assets/img/avatar-default.svg';
import { FC, UsersGetResponseDto } from 'common/types/types';
import { Button, Image } from 'components/common/common';

import styles from './styles.module.scss';

type Props = {
  mentor: UsersGetResponseDto;
};

const MyMentor: FC<Props> = ({ mentor }) => {
  return (
    <div>
      <h2>My Mentor</h2>
      <div className={styles.mentorCard}>
        <div className={styles.mentorInfo}>
          <Image
            width="75"
            height="75"
            alt="mentor"
            isCircular={true}
            src={mentor.userDetails.avatarUrl ?? defaultUserAvatar}
          />
          <div className={styles.mentorData}>
            <p className={styles.mentorName}>{mentor.userDetails.fullName}</p>
            <p className={styles.mentorContacts}>{mentor.email}</p>
          </div>
        </div>
        <div className={styles.changeMentor}>
          <Button label="Change Mentor" btnColor="gray" />
        </div>
      </div>
    </div>
  );
};

export { MyMentor };
