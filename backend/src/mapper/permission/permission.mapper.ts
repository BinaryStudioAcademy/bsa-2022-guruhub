import { PermissionResponseDto } from '~/common/types/types';
import { Permission } from '~/data/models/models';
const permissionModelToDto = (model: Permission): PermissionResponseDto => {
  return {
    id: model.id,
    key: model.key,
    name: model.name,
  };
};

export { permissionModelToDto };
