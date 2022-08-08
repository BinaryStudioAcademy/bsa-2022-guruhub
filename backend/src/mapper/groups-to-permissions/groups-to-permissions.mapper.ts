import { GroupsToPermissionsResponseDto } from '~/common/types/types';
import { GroupsToPermissions } from '~/data/models/models';

const groupsPermissionsModelToDto = (
  model: GroupsToPermissions,
): GroupsToPermissionsResponseDto => {
  return {
    id: model.id,
    groupId: model.group_id,
    permissionId: model.permission_id,
    isAllowed: model.is_allowed,
  };
};

export { groupsPermissionsModelToDto };
