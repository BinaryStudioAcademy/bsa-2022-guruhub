import { AppRoute } from 'common/enums/enums';
import { FC, GroupsItemResponseDto } from 'common/types/types';
import { IconButton } from 'components/common/common';
import { GroupsTableActionsProps } from 'components/uam/common/types/types';
import { generateDynamicPath } from 'helpers/helpers';
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
      <div>
        <IconButton
          iconName="settings"
          to={generateDynamicPath(AppRoute.UAM_CONFIGURE_GROUP_$ID, { id })}
          label="Edit"
        />
      </div>
      <div>
        <IconButton iconName="delete" onClick={handleDelete} label="Delete" />
      </div>
    </div>
  );
};

export { ActionsCell };
