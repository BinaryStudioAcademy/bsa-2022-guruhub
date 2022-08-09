import { permission as permissionRep } from '~/data/repositories/repositories';
import { PermissionsGetAllResponseDto } from '~/common/types/types';

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

    const items = permissions.map((permission) => {
      return {
        id: permission.id,
        key: permission.key,
        name: permission.name,
      };
    });

    return {
      items,
    };
  }
}

export { Permission };
