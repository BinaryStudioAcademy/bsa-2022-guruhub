import { Checkbox } from 'components/common/common';
import { FC } from 'react';
import { CellProps } from 'react-table';

import {
  GroupCreationUsersTableActionsProps,
  GroupCreationUsersTableRow,
} from '../../../../common/types/types';

const UserActionCell: FC<
  CellProps<GroupCreationUsersTableRow, GroupCreationUsersTableActionsProps>
> = ({ value: { id, name, register, control } }) => {
  return <Checkbox id={id} name={name} register={register} control={control} />;
};

export { UserActionCell };
