import { permission as permissionRep } from '~/data/repositories/repositories';
import { PermissionResponseDto } from '~/common/types/types';
import { permissionModelToDto } from '~/mapper/permission/permission.mapper';

type Constructor = {
  permissionRepository: typeof permissionRep;
};

class Permission {
  #permissionRepository: typeof permissionRep;

  constructor({ permissionRepository }: Constructor) {
    this.#permissionRepository = permissionRepository;
  }

  async getPermissions(): Promise<PermissionResponseDto[]> {
    const permissions = await this.#permissionRepository.getAll();
    const resultArr: PermissionResponseDto[] = [];
    permissions.forEach((permission) => {
      const dtoPermission = permissionModelToDto(permission);
      resultArr.push(dtoPermission);
    });

    return resultArr;
  }
}

export { Permission };
