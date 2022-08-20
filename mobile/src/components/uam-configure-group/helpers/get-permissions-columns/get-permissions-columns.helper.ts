import { TableColumn } from '~/common/types/types';
import { PermissionTableAccessor } from '~/components/uam-configure-group/common/enums/enums';
import { PermissionsTableRow } from '~/components/uam-configure-group/common/types/types';

const getPermissionsColumns = (): TableColumn<PermissionsTableRow>[] => {
  return [
    {
      header: '',
      accessor: PermissionTableAccessor.CHECKBOX,
    },
    {
      header: 'Policy name',
      accessor: PermissionTableAccessor.NAME,
    },
    {
      header: 'Policy ID',
      accessor: PermissionTableAccessor.ID,
    },
  ];
};

export { getPermissionsColumns };
