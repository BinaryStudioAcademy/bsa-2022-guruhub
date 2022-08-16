import {
  FormControl,
  FormControlErrors,
  FormControlPath,
} from 'common/types/types';
import { UserTableAccessor } from 'components/uam/common/enums/user-table-accessor.enum';
import { Column } from 'react-table';

import {
  GroupCreationUsersTableActionsProps,
  GroupCreationUsersTableRow,
} from '../../common/types/types';
import { UserActionCell } from '../../components/components';

type UseFormRegisterEntities = {
  name: FormControlPath;
  errors: FormControlErrors;
  onCheckboxToggle: (value: number) => void;
};

const getUserColumns = (
  control: FormControl,
  { name, errors, onCheckboxToggle }: UseFormRegisterEntities,
): Column<GroupCreationUsersTableRow>[] => {
  return [
    {
      Header: 'Select',
      accessor: ({ id }): GroupCreationUsersTableActionsProps => ({
        errors,
        name,
        control,
        onToggle: () => onCheckboxToggle(id),
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
