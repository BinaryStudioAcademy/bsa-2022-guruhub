import {
  FormControl,
  FormControlErrors,
  FormControlPath,
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
  errors: FormControlErrors;
  onCheckboxToggle: (value: number) => void;
};

const getPermissionsColumns = (
  control: FormControl,
  { name, errors, onCheckboxToggle }: UseFormRegisterEntities,
): Column<PermissionsTableRow>[] => {
  return [
    {
      Header: 'Select',
      accessor: ({ id }): PermissionsTableActionsProps => ({
        errors,
        name,
        control,
        onToggle: () => onCheckboxToggle(id),
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
