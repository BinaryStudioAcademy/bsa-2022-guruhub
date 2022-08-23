import { IconButton } from 'components/common/common';
import {
  UsersTableActionsProps,
  UsersTableRow,
} from 'components/uam/common/types/types';
import { useAppSelector } from 'hooks/hooks';
import { FC } from 'react';
import { CellProps } from 'react-table';

const ActionsCell: FC<CellProps<UsersTableRow, UsersTableActionsProps>> = ({
  value: { id, onDelete },
}) => {
  const { user } = useAppSelector((state) => state.auth);

  const handleDelete = (): void => {
    onDelete(id);
  };

  return (
    <div>
      {user?.id !== id && (
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
