import { FC, GroupsItemResponseDto } from 'common/types/types';
import { Icon } from 'components/common/common';
import { GroupsTableActionsProps } from 'components/uam/common/types/types';
import { CellProps } from 'react-table';

import styles from './styles.module.scss';

const ActionsCell: FC<
  CellProps<GroupsItemResponseDto, GroupsTableActionsProps>
> = ({ value: { id, onDelete } }) => {
  const handleDelete = (): void => {
    onDelete(id);
  };

  return (
    <button className={styles.deleteBtn} type="button" onClick={handleDelete}>
      <Icon name="delete" className={styles.deleteIcon} />
    </button>
  );
};

export { ActionsCell };
