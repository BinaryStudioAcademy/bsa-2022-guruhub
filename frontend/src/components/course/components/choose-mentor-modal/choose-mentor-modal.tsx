import { FC, UserDetailsResponseDto } from 'common/types/types';
import { Modal } from 'components/common/common';

import { MentorsList } from './components/components';

type Props = {
  mentors: UserDetailsResponseDto[];
  isOpen: boolean;
  onModalToggle: (evt: React.MouseEvent) => void;
  onMentorSelectClick: (mentorId: number) => void;
};

const ChooseMentorModal: FC<Props> = ({
  mentors,
  isOpen,
  onModalToggle,
  onMentorSelectClick,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onModalToggle} title="Choose a mentor">
      <MentorsList
        mentors={mentors}
        onMentorSelectClick={onMentorSelectClick}
      />
    </Modal>
  );
};

export { ChooseMentorModal };
