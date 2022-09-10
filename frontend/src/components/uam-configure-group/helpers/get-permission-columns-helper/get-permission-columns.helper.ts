import { FormControlPath } from 'common/types/types';
import { PermissionTableAccessor } from 'components/uam-configure-group/common/enums/enums';
import {
  PermissionsTableActionsProps,
  PermissionsTableRow,
} from 'components/uam-configure-group/common/types/types';
import { PermissionsActionsCell } from 'components/uam-configure-group/components/components';
import { Column } from 'react-table';

type UseFormRegisterEntities = {
  name: FormControlPath;
  onCheckboxToggle: (value: number) => void;
  selectedPermissionIds: number[];
};

const getPermissionsColumns = ({
  name,
  onCheckboxToggle,
  selectedPermissionIds,
}: UseFormRegisterEntities): Column<PermissionsTableRow>[] => {
  return [
    {
      Header: 'Select',
      accessor: ({ id }): PermissionsTableActionsProps => ({
        name,
        onToggle: () => onCheckboxToggle(id),
        isChecked: selectedPermissionIds.includes(id),
      }),
      Cell: PermissionsActionsCell,
      width: 50,
    },
    {
      Header: 'Policy name',
      accessor: PermissionTableAccessor.NAME,
      width: 500,
    },
    {
      Header: 'Policy ID',
      accessor: PermissionTableAccessor.ID,
      width: 110,
    },
  ];
};

export { getPermissionsColumns };
