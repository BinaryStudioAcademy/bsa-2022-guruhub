import { permission as permissionRep } from '~/data/repositories/repositories';
import { PermissionResponseDto } from '~/common/types/types';

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

    return permissions.map((permission) => {
      return {
        id: permission.id,
        key: permission.key,
        name: permission.name,
      };
    });
  }
}

export { Permission };
