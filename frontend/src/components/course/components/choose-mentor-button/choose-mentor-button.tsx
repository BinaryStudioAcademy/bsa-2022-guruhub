import chooseMentorImage from 'assets/img/choose-mentor-image.png';
import { FC } from 'common/types/types';
import { Button, Image } from 'components/common/common';

import styles from './styles.module.scss';

type Props = {
  onClick: (evt: React.MouseEvent) => void;
};

const ChooseMentorButton: FC<Props> = ({ onClick }) => {
  return (
    <div className={styles.chooseMentorContainer}>
      <div className={styles.image}>
        <Image
          alt="course image"
          src={chooseMentorImage}
          width="80%"
          height="80%"
        />
      </div>

      <div className={styles.button}>
        <Button label="Choose a mentor" btnColor="blue" onClick={onClick} />
      </div>
    </div>
  );
};

export { ChooseMentorButton };
