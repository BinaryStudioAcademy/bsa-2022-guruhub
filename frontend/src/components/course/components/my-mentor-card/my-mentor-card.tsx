import { FC, UsersGetResponseDto } from 'common/types/types';

import { MentorCard } from './components/components';

type Props = {
  mentor: UsersGetResponseDto;
};

const MyMentor: FC<Props> = ({ mentor }) => {
  return (
    <div>
      <h1>My Mentor</h1>
      <MentorCard
        name={mentor.userDetails.fullName}
        avatar={mentor.userDetails.avatarUrl}
        email={mentor.email}
      />
    </div>
  );
};

export { MyMentor };
