import mentorImage from 'assets/img/mentor.png';
import { FC } from 'common/types/types';
import { Button, Image } from 'components/common/common';

import styles from './styles.module.scss';

type Props = {
  onClick: () => void;
};

const BecomeAMentor: FC<Props> = ({ onClick }) => {
  return (
    <div className={styles.mentorWrapper}>
      <div className={styles.buttonWrapper}>
        <Button
          label="Become a Mentor"
          btnType="filled"
          btnColor="blue"
          onClick={onClick}
        />
      </div>
      <div className={styles.imageWrapper}>
        <Image
          src={mentorImage}
          alt="Mentor Image"
          height="100%"
          width="100%"
        />
      </div>
    </div>
  );
};

export { BecomeAMentor };
