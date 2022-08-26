import defaultMentorImage from 'assets/img/default-mentor-image.png';
import { FC, UserDetailsResponseDto } from 'common/types/types';
import { Button, Image } from 'components/common/common';
import { useAppDispatch } from 'hooks/hooks';
import { courseActions } from 'store/actions';

import styles from './styles.module.scss';

type Props = {
  mentor: UserDetailsResponseDto;
  onClick: (evt: React.MouseEvent) => void;
};

const MentorCard: FC<Props> = ({ onClick, mentor }) => {
  const dispatch = useAppDispatch();

  const handleClick = (evt: React.MouseEvent): void => {
    dispatch(courseActions.chooseMentor({ id: mentor.id }));
    onClick(evt);
  };

  return (
    <div className={styles.container}>
      <div className={styles.avatarWrapper}>
        <Image
          alt="mentor image"
          src={mentor.avatarUrl ?? defaultMentorImage}
          width="200"
          height="100"
          classes={styles.avatar}
        />
      </div>
      <div className={styles.infoContainer}>
        <p className={styles.fullName}>{mentor.fullName}</p>
        <div className={styles.button}>
          <Button label="Choose" btnColor="blue" onClick={handleClick} />
        </div>
      </div>
    </div>
  );
};

export { MentorCard };
