import { IconButton } from 'components/common/common';
import {
  UsersTableActionsProps,
  UsersTableRow,
} from 'components/uam/common/types/types';
import { FC } from 'react';
import { CellProps } from 'react-table';

const ActionsCell: FC<CellProps<UsersTableRow, UsersTableActionsProps>> = ({
  value: { id, onDelete, hasSameUser },
}) => {
  const handleDelete = (): void => {
    onDelete(id);
  };

  return (
    <div>
      {!hasSameUser && (
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
