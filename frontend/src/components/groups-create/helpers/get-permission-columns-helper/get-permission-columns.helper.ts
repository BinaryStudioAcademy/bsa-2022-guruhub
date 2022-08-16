import { FormControlPath } from 'common/types/types';
import { Column } from 'react-table';

import { PermissionTableAccessor } from '../../common/enums/enums';
import {
  PermissionsTableActionsProps,
  PermissionsTableRow,
} from '../../common/types/types';
import { PermissionsActionsCell } from '../../components/components';

type UseFormRegisterEntities = {
  name: FormControlPath;
  onCheckboxToggle: (value: number) => void;
};

const getPermissionsColumns = ({
  name,
  onCheckboxToggle,
}: UseFormRegisterEntities): Column<PermissionsTableRow>[] => {
  return [
    {
      Header: 'Select',
      accessor: ({ id }): PermissionsTableActionsProps => ({
        name,
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
