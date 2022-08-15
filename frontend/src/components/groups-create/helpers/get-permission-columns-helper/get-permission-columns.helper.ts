import {
  FormControl,
  FormControlPath,
  FormControlRegister,
} from 'common/types/types';
import { Column } from 'react-table';

import { PermissionTableAccessor } from '../../common/enums/enums';
import {
  PermissionsTableActionsProps,
  PermissionsTableRow,
} from '../../common/types/types';
import { PermissionsActionsCell } from '../../components/components';

type UseFormRegisterEntities = {
  name: FormControlPath;
  register: FormControlRegister;
};

const getPermissionsColumns = (
  control: FormControl,
  { name, register }: UseFormRegisterEntities,
): Column<PermissionsTableRow>[] => {
  return [
    {
      Header: 'Select',
      accessor: ({
        id,
      }: PermissionsTableRow): PermissionsTableActionsProps => ({
        register,
        id,
        name,
        control,
      }),
      Cell: PermissionsActionsCell,
    },
    {
      Header: 'Policy name',
      accessor: PermissionTableAccessor.NAME,
    },
    {
      Header: 'Policy ID',
      accessor: PermissionTableAccessor.ID,
    },
  ];
};

export { getPermissionsColumns };
