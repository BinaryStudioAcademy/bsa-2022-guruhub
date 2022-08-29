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
      .select()
      .withGraphJoined('userDetails')
      .page(page, count)
      .castTo<Page<UserM & UsersGetResponseDto>>();

    return {
      items: results,
      total,
    };
  }

  public getByEmail(email: string): Promise<UsersByEmailResponseDto | null> {
    return this.#UserModel
      .query()
      .select()
      .withGraphJoined('userDetails(selectFullName)')
      .modifiers({
        selectFullName(builder) {
          builder.select('fullName');
        },
      })
      .where({ email })
      .first()
      .castTo<UsersByEmailResponseDto>()
      .execute();
  }

  public getById(id: string): Promise<UsersGetResponseDto | null> {
    return this.#UserModel
      .query()
      .findById(id)
      .withGraphJoined('userDetails')
      .castTo<UsersGetResponseDto>()
      .execute();
  }

  public async getUserPermissions(id: number): Promise<PermissionM[]> {
    return this.#UserModel
      .query()
      .select(
        'groups:permissions.id',
        'groups:permissions.name',
        'groups:permissions.key',
      )
      .joinRelated('groups.permissions')
      .where('users.id', id)
      .castTo<PermissionM[]>()
      .execute();
  }

  public async getByIds(ids: number[]): Promise<UserM[]> {
    return this.#UserModel.query().findByIds(ids).execute();
  }

  public create(user: {
    email: string;
    passwordSalt: string;
    passwordHash: string;
  }): Promise<UserM> {
    const { email, passwordSalt, passwordHash } = user;

    return this.#UserModel
      .query()
      .insert({
        email,
        passwordSalt,
        passwordHash,
      })
      .execute();
  }

  public delete(userId: number): Promise<number> {
    return this.#UserModel.query().delete().where({ id: userId }).execute();
  }
}

export { User };
