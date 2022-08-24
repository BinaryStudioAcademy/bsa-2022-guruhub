import { FC } from 'common/types/types';
import { IconButton } from 'components/common/common';

type Props = {
  onClick: (evt: React.MouseEvent<Element, MouseEvent>) => void;
};

const EditButton: FC<Props> = ({ onClick }) => (
  <div>
    <IconButton label="edit category" iconName="edit" onClick={onClick} />
  </div>
);

export { EditButton };
