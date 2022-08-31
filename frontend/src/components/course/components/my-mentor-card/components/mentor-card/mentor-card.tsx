import defaultUserAvatar from 'assets/img/avatar-default.svg';
import { FC } from 'common/types/types';
import { Button, Image } from 'components/common/common';

import styles from './styles.module.scss';

type Props = {
  name: string;
  avatar: string | null;
  email: string;
};

const MentorCard: FC<Props> = ({ name, avatar, email }) => {
  return (
    <div className={styles.mentorCard}>
      <div className={styles.mentorInfo}>
        <Image
          width="75"
          height="75"
          alt="mentor"
          isCircular={true}
          src={avatar ?? defaultUserAvatar}
        />
        <div className={styles.mentorData}>
          <p className={styles.mentorName}>{name}</p>
          <p className={styles.mentorContacts}>{email}</p>
        </div>
      </div>
      <div className={styles.changeMentor}>
        <Button label="Change Mentor" btnColor="gray" />
      </div>
    </div>
  );
};

export { MentorCard };
