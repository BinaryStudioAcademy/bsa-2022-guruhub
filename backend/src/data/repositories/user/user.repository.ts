import {
  EntityPagination,
  EntityPaginationRequestQueryDto,
  UserWithDetails,
} from '~/common/types/types';
import {
  Permission as PermissionM,
  User as UserM,
  UserWithDetails as UserWithDetailsM,
} from '~/data/models/models';

type Constructor = {
  UserModel: typeof UserM;
};

class User {
  #UserModel: typeof UserM;

  public constructor({ UserModel }: Constructor) {
    this.#UserModel = UserModel;
  }

  public async getPaginated({
    page,
    count,
  }: EntityPaginationRequestQueryDto): Promise<
    EntityPagination<UserWithDetailsM>
  > {
    const result = await this.#UserModel
      .query()
      .select('users.id', 'users.created_at', 'email', 'full_name')
      .joinRelated('user_details')
      .page(page, count)
      .castTo<UserWithDetails>();

    return {
      items: result.results,
      total: result.total,
    };
  }

  public async getByEmail(email: string): Promise<UserWithDetailsM | null> {
    const user = await this.#UserModel
      .query()
      .select('users.id', 'users.created_at', 'email', 'full_name')
      .joinRelated('user_details')
      .where({ email })
      .first()
      .castTo<UserWithDetailsM>();

    return user ?? null;
  }

  public async getById(id: string): Promise<UserWithDetailsM | null> {
    const user = await this.#UserModel
      .query()
      .select('users.id', 'users.created_at', 'email', 'full_name')
      .joinRelated('user_details')
      .where({ 'users.id': id })
      .first()
      .castTo<UserWithDetailsM>();

    return user ?? null;
  }

  public async getUserPermissions(id: number): Promise<PermissionM[]> {
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

  public async getByIds(ids: number[]): Promise<UserM[]> {
    const users = await this.#UserModel.query().findByIds(ids);

    return users;
  }

  public async create(user: {
    email: string;
    passwordSalt: string;
    passwordHash: string;
  }): Promise<UserM> {
    const { email, passwordSalt, passwordHash } = user;

    return this.#UserModel.query().insert({
      email,
      passwordSalt,
      passwordHash,
    });
  }

  public async delete(userId: number): Promise<number> {
    const deletedUsersCount = await this.#UserModel
      .query()
      .delete()
      .where({ id: userId });

    return deletedUsersCount;
  }
}

export { User };
