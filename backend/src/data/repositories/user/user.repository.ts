import { Page } from 'objection';

import {
  EntityPagination,
  EntityPaginationRequestQueryDto,
  UsersByEmailResponseDto,
  UsersGetResponseDto,
} from '~/common/types/types';
import { Permission as PermissionM, User as UserM } from '~/data/models/models';

type Constructor = {
  UserModel: typeof UserM;
};

class User {
  #UserModel: typeof UserM;

  public constructor({ UserModel }: Constructor) {
    this.#UserModel = UserModel;
  }

  public async getAll({
    page,
    count,
  }: EntityPaginationRequestQueryDto): Promise<
    EntityPagination<UsersGetResponseDto>
  > {
    const { results, total } = await this.#UserModel
      .query()
      .select('users.id', 'users.createdAt', 'email', 'fullName')
      .joinRelated('userDetails')
      .page(page, count)
      .castTo<Page<UserM & UsersGetResponseDto>>();

    return {
      items: results,
      total,
    };
  }

  public async getByEmail(
    email: string,
  ): Promise<UsersByEmailResponseDto | null> {
    const user = await this.#UserModel
      .query()
      .select(
        'users.id',
        'users.createdAt',
        'email',
        'fullName',
        'passwordHash',
        'passwordSalt',
      )
      .joinRelated('userDetails')
      .where({ email })
      .first()
      .castTo<UsersByEmailResponseDto>();

    return user ?? null;
  }

  public async getById(id: string): Promise<UsersGetResponseDto | null> {
    const user = await this.#UserModel
      .query()
      .select('users.id', 'users.createdAt', 'email', 'fullName')
      .joinRelated('userDetails')
      .where({ 'users.id': id })
      .first()
      .castTo<UsersGetResponseDto>();

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
