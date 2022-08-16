import { Checkbox } from 'components/common/common';
import { useAppForm } from 'hooks/hooks';
import { FC } from 'react';
import { CellProps } from 'react-table';

import {
  GroupCreationUsersTableActionsProps,
  GroupCreationUsersTableRow,
} from '../../common/types/types';

const UserActionCell: FC<
  CellProps<GroupCreationUsersTableRow, GroupCreationUsersTableActionsProps>
> = ({ value: { name, onToggle } }) => {
  const { control, errors } = useAppForm({ defaultValues: {} });

  return (
    <form onChange={onToggle}>
      <Checkbox errors={errors} name={name} control={control} />
    </form>
  );
};

export { UserActionCell };
