import { Icon } from 'components/common/common';
import { FC } from 'react';
import { CellProps } from 'react-table';

import {
  UsersTableActionsProps,
  UsersTableRow,
} from '../../../../common/types/types';
import styles from './styles.module.scss';

const ActionsCell: FC<CellProps<UsersTableRow, UsersTableActionsProps>> = ({
  value: { id, onDelete },
}) => {
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
