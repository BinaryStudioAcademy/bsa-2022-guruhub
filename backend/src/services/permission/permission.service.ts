import { PermissionsGetAllResponseDto } from '~/common/types/types';
import { permission as permissionRep } from '~/data/repositories/repositories';

type Constructor = {
  permissionRepository: typeof permissionRep;
};

class Permission {
  #permissionRepository: typeof permissionRep;

  constructor({ permissionRepository }: Constructor) {
    this.#permissionRepository = permissionRepository;
  }

  async getAll(): Promise<PermissionsGetAllResponseDto> {
    const permissions = await this.#permissionRepository.getAll();

    return {
      items: permissions.map((permission) => ({
        id: permission.id,
        key: permission.key,
        name: permission.name,
      })),
    };
  }
}

export { Permission };
