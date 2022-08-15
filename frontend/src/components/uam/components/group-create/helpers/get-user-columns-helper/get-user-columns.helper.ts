import {
  FormControl,
  FormControlPath,
  FormControlRegister,
} from 'common/types/types';
import { UserTableAccessor } from 'components/uam/common/enums/user-table-accessor.enum';
import { Column } from 'react-table';

import {
  GroupCreationUsersTableActionsProps,
  GroupCreationUsersTableRow,
} from '../../../../common/types/types';
import { UserActionCell } from '../../components/components';

type UseFormRegisterEntities = {
  name: FormControlPath;
  register: FormControlRegister;
};

const getUserColumns = (
  control: FormControl,
  { name, register }: UseFormRegisterEntities,
): Column<GroupCreationUsersTableRow>[] => {
  return [
    {
      Header: 'Select',
      accessor: ({
        id,
      }: GroupCreationUsersTableRow): GroupCreationUsersTableActionsProps => ({
        id,
        name,
        register,
        control,
      }),
      Cell: UserActionCell,
    },
    {
      Header: 'Name',
      accessor: UserTableAccessor.FULL_NAME,
    },
    {
      Header: 'Email',
      accessor: UserTableAccessor.EMAIL,
    },
    {
      Header: 'Worker ID',
      accessor: UserTableAccessor.ID,
    },
  ];
};

export { getUserColumns };
