import { FC } from 'common/types/types';
import { Modal } from 'components/common/common';

type Props = {
  isOpen: boolean;
  onModalToggle: (evt: React.MouseEvent) => void;
};

const ChooseMentorModal: FC<Props> = ({ isOpen, onModalToggle }) => {
  return (
    <Modal isOpen={isOpen} onClose={onModalToggle} title="Choose a mentor">
      <div></div>
    </Modal>
  );
};

export { ChooseMentorModal };
