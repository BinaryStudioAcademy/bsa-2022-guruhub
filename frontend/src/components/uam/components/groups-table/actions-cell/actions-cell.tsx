import { FC, GroupsItemResponseDto } from 'common/types/types';
import { Icon } from 'components/common/common';
import { GroupsTableActionsProps } from 'components/uam/common/types/types';
import { useNavigate } from 'hooks/hooks';
import { CellProps } from 'react-table';

import styles from './styles.module.scss';

const ActionsCell: FC<
  CellProps<GroupsItemResponseDto, GroupsTableActionsProps>
> = ({ value: { id } }) => {
  const navigate = useNavigate();

  const handleNavigateToEdit = (): void => {
    navigate(`/uam/configurate-group/${id}`);
  };

  return (
    <button
      className={styles.editBtn}
      type="button"
      onClick={handleNavigateToEdit}
    >
      <Icon name="settings" className={styles.editIcon} />
    </button>
  );
};

export { ActionsCell };
