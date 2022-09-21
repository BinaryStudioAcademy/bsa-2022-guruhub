import { IconButton } from 'components/common/common';
import {
  UsersTableActionsProps,
  UsersTableRow,
} from 'components/uam/common/types/types';
import { FC } from 'react';
import { CellProps } from 'react-table';

import styles from './styles.module.scss';

const ActionsCell: FC<CellProps<UsersTableRow, UsersTableActionsProps>> = ({
  value: { id, onDelete, isCurrentSignedUser },
}) => {
  const handleDelete = (): void => {
    onDelete(id);
  };

  return (
    <div className={styles.buttonWrapper}>
      {!isCurrentSignedUser && (
        <IconButton
          iconName="delete"
          onClick={handleDelete}
          label="Delete Entity"
        />
      )}
    </div>
  );
};

export { ActionsCell };
