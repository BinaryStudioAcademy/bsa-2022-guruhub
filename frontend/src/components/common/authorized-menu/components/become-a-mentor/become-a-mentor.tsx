import mentorImage from 'assets/img/mentor.png';
import { FC } from 'common/types/types';
import { Button, Image } from 'components/common/common';
import { useAppDispatch } from 'hooks/hooks';
import { courseActions } from 'store/actions';

import styles from './styles.module.scss';

const BecomeAMentor: FC = () => {
  const dispatch = useAppDispatch();

  const handleClick = (): void => {
    dispatch(courseActions.becomeAMentor());
  };

  return (
    <div className={styles.mentorWrapper}>
      <div className={styles.imageWrapper}>
        <Image
          src={mentorImage}
          alt="Mentor Image"
          height="100%"
          width="100%"
        />
      </div>
      <div className={styles.buttonWrapper}>
        <Button
          label="Become a Mentor"
          btnType="filled"
          btnColor="blue"
          onClick={handleClick}
        />
      </div>
    </div>
  );
};

export { BecomeAMentor };
