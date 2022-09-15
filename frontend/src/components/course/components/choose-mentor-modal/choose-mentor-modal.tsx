import { FC, UsersGetResponseDto } from 'common/types/types';
import { Modal } from 'components/common/common';

import { MentorsList, SearchBar } from './components/components';

type Props = {
  mentors: UsersGetResponseDto[];
  isOpen: boolean;
  onModalToggle: () => void;
  onMentorSelectClick: (mentorId: number) => void;
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
