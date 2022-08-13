import {
  EntityPagination,
  EntityPaginationRequestQueryDto,
} from '~/common/types/types';
import { Permission as PermissionM, User as UserM } from '~/data/models/models';

type Constructor = {
  UserModel: typeof UserM;
};

class User {
  #UserModel: typeof UserM;

  constructor({ UserModel }: Constructor) {
    this.#UserModel = UserModel;
  }

  async getPaginated({
    page,
    count,
  }: EntityPaginationRequestQueryDto): Promise<EntityPagination<UserM>> {
    const result = await this.#UserModel.query().page(page, count);

    return {
      items: result.results,
      total: result.total,
    };
  }

  async getByEmail(email: string): Promise<UserM | null> {
    const user = await this.#UserModel
      .query()
      .select()
      .where({ email })
      .first();

    return user ?? null;
  }

  async getById(id: string): Promise<UserM | null> {
    const user = await this.#UserModel.query().select().where({ id }).first();

    return user ?? null;
  }

  async getUserPermissions(id: number): Promise<PermissionM[]> {
    const permissions = await this.#UserModel
      .query()
      .select(
        'groups:permissions.id',
        'groups:permissions.name',
        'groups:permissions.key',
      )
      .joinRelated('groups.permissions')
      .where('users.id', id)
      .castTo<PermissionM[]>();

    return permissions;
  }

  async getByIds(ids: number[]): Promise<UserM[]> {
    const users = await this.#UserModel.query().findByIds(ids);

    return users;
  }

  async create(user: {
    email: string;
    fullName: string;
    passwordSalt: string;
    passwordHash: string;
  }): Promise<UserM> {
    const { email, fullName, passwordSalt, passwordHash } = user;

    return this.#UserModel.query().insert({
      email,
      fullName,
      passwordSalt,
      passwordHash,
    });
  }

  async delete(userId: number): Promise<number> {
    const deletedUsersCount = await this.#UserModel
      .query()
      .delete()
      .where({ id: userId });

    return deletedUsersCount;
  }
}

export { User };
