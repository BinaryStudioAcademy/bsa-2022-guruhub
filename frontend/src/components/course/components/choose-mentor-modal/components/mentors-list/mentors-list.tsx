import { FC, UserDetailsResponseDto } from 'common/types/types';

import { MentorCard } from './components/components';
import styles from './styles.module.scss';

type Props = {
  onMentorSelectClick: (mentorId: number) => void;
  mentors: UserDetailsResponseDto[];
};

const MentorsList: FC<Props> = ({ onMentorSelectClick, mentors }) => {
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
        <MentorCard
          key={mentor.id}
          mentor={mentor}
          onClick={onMentorSelectClick}
        />
      ))}
    </div>
  );
};

export { MentorsList };
