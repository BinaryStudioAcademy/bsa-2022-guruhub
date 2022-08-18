import { TableColumn } from '~/common/types/types';
import { PermissionTableAccessor } from '~/components/uam-groups-create/common/enums/enums';
import { PermissionsTableRow } from '~/components/uam-groups-create/common/types/types';

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
