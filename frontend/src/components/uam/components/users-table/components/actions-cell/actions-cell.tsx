import { IconButton } from 'components/common/common';
import { FC } from 'react';
import { CellProps } from 'react-table';

import {
  UsersTableActionsProps,
  UsersTableRow,
} from '../../../../common/types/types';

const ActionsCell: FC<CellProps<UsersTableRow, UsersTableActionsProps>> = ({
  value: { id, onDelete },
}) => {
  const handleDelete = (): void => {
    onDelete(id);
  };

  return (
    <IconButton
      iconName="delete"
      onClick={handleDelete}
      label="Delete Entity"
    />
  );
};

export { ActionsCell };
