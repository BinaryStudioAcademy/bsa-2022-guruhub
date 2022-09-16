import { PermissionsGetAllItemResponseDto } from 'common/types/types';
import { PermissionsTableRow } from 'components/uam-configure-group/common/types/types';

const getPermissionTableData = (
  permissions: PermissionsGetAllItemResponseDto[],
): PermissionsTableRow[] => {
  return permissions.map((permission) => ({
    id: permission.id,
    name: permission.name,
  }));
};

export { getPermissionTableData };
