import { Checkbox } from 'components/common/common';
import { FC } from 'react';
import { CellProps } from 'react-table';

import {
  GroupCreationUsersTableActionsProps,
  GroupCreationUsersTableRow,
} from '../../common/types/types';

const UserActionCell: FC<
  CellProps<GroupCreationUsersTableRow, GroupCreationUsersTableActionsProps>
> = ({ value: { errors, name, onToggle } }) => {
  return (
    <form onChange={onToggle}>
      <Checkbox errors={errors} name={name} />
    </form>
  );
};

export { UserActionCell };
