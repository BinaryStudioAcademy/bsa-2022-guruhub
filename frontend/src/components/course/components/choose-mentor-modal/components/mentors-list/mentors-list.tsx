import { FC, UserDetailsResponseDto } from 'common/types/types';

import { MentorCard } from './components/components';
import styles from './styles.module.scss';

type Props = {
  onClick: (evt: React.MouseEvent) => void;
  mentors: UserDetailsResponseDto[];
};

const MentorsList: FC<Props> = ({ onClick, mentors }) => {
  const hasMentors = Boolean(mentors.length);

  if (!hasMentors) {
    return (
      <p className={styles.placeholder}>
        There are no mentors for current course yet
      </p>
    );
  }

  return (
    <div className={styles.container}>
      {mentors.map((mentor) => (
        <MentorCard key={mentor.id} mentor={mentor} onClick={onClick} />
      ))}
    </div>
  );
};

export { MentorsList };
