import { FC, UserDetailsResponseDto } from 'common/types/types';
import { Modal } from 'components/common/common';

import { MentorsList, SearchBar } from './components/components';

type Props = {
  mentors: UserDetailsResponseDto[];
  isOpen: boolean;
  onModalToggle: (evt: React.MouseEvent) => void;
  onMentorSelectClick: (mentorId: number, evt: React.MouseEvent) => void;
  onMentorSearch: (mentorName: string) => void;
};

const ChooseMentorModal: FC<Props> = ({
  mentors,
  isOpen,
  onModalToggle,
  onMentorSelectClick,
  onMentorSearch,
}) => {
  const handleSearch = (search: string): void => {
    onMentorSearch(search);
  };

  return (
    <Modal isOpen={isOpen} onClose={onModalToggle} title="Choose a mentor">
      <SearchBar onSearch={handleSearch} />
      <MentorsList
        mentors={mentors}
        onMentorSelectClick={onMentorSelectClick}
      />
    </Modal>
  );
};

export { ChooseMentorModal };
