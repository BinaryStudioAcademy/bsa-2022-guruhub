import { AppRoute } from 'common/enums/enums';
import { FC, GroupsItemResponseDto } from 'common/types/types';
import { IconButton } from 'components/common/common';
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
    <div className={styles.container}>
      <IconButton
        iconName="settings"
        to={`${AppRoute.UAM_CONFIGURE_GROUP}/${id}` as AppRoute}
        label="Edit"
      />
      <IconButton iconName="delete" onClick={handleDelete} label="Delete" />
    </div>
  );
};

export { ActionsCell };
