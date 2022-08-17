import { PermissionsGroupCreationDto } from '~/common/types/permissions/permissions';
import { TableColumn } from '~/common/types/types';
import { PermissionTableAccessor } from '~/components/uam/components/uam-group-creation/common/enums/enums';

const getPermissionsColumns =
  (): TableColumn<PermissionsGroupCreationDto>[] => {
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
