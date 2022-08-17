import { FormControlPath } from 'common/types/types';
import { PermissionTableAccessor } from 'components/configurate-group/common/enums/enums';
import {
  PermissionsTableActionsProps,
  PermissionsTableRow,
} from 'components/configurate-group/common/types/types';
import { PermissionsActionsCell } from 'components/configurate-group/components/components';
import { Column } from 'react-table';

type UseFormRegisterEntities = {
  name: FormControlPath;
  onCheckboxToggle: (value: number) => void;
  defaultSelectedPermissionIds?: number[];
};

const getPermissionsColumns = ({
  name,
  onCheckboxToggle,
  defaultSelectedPermissionIds = [],
}: UseFormRegisterEntities): Column<PermissionsTableRow>[] => {
  return [
    {
      Header: 'Select',
      accessor: ({ id }): PermissionsTableActionsProps => ({
        name,
        onToggle: () => onCheckboxToggle(id),
        isChecked: defaultSelectedPermissionIds?.includes(id),
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
