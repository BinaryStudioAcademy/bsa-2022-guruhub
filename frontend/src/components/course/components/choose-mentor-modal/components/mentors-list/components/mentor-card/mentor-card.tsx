import defaultUserAvatar from 'assets/img/avatar-default.svg';
import { FC, UsersGetResponseDto } from 'common/types/types';
import { Button, Image } from 'components/common/common';

import styles from './styles.module.scss';

type Props = {
  mentor: UsersGetResponseDto;
  onClick: (mentorId: number) => void;
};

const MentorCard: FC<Props> = ({ onClick, mentor }) => {
  const handleClick = (): void => {
    onClick(mentor.id);
  };

  return (
    <div className={styles.container}>
      <div className={styles.avatarWrapper}>
        <Image
          alt="mentor image"
          src={mentor.userDetails.avatar?.url ?? defaultUserAvatar}
          width="200"
          height="100"
          classes={styles.avatar}
          isCircular
        />
      </div>
      <div className={styles.infoContainer}>
        <p className={styles.fullName}>{mentor.userDetails.fullName}</p>
        <div className={styles.button}>
          <Button
            label="Choose"
            btnType="bottom"
            btnColor="blue"
            onClick={handleClick}
          />
        </div>
      </div>
    </div>
  );
};

export { MentorCard };
