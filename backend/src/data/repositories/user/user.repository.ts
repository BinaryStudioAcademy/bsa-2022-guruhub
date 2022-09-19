import { Page } from 'objection';

import { SortOrder } from '~/common/enums/enums';
import {
  EntityPagination,
  EntityPaginationRequestQueryDto,
  NumericalValueContainer,
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
      .withGraphJoined('userDetails(withoutMoneyBalance)')
      .orderBy('id', SortOrder.ASC)
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
      .withGraphJoined('userDetails(withoutMoneyBalance)')
      .where({ email })
      .first()
      .castTo<UsersByEmailResponseDto>()
      .execute();
  }

  public getById(id: number): Promise<UsersGetResponseDto | null> {
    return this.#UserModel
      .query()
      .findById(id)
      .withGraphJoined('userDetails(withoutMoneyBalance).[avatar]')
      .castTo<UsersGetResponseDto>()
      .execute();
  }

  public getUserPermissions(id: number): Promise<PermissionM[]> {
    return this.#UserModel
      .query()
      .select(
        'groups:permissions.id',
        'groups:permissions.name',
        'groups:permissions.key',
      )
      .joinRelated('groups.permissions')
      .where('users.id', id)
      .distinct('groups:permissions.id')
      .castTo<PermissionM[]>()
      .execute();
  }

  public getByIds(ids: number[]): Promise<UsersGetResponseDto[]> {
    return this.#UserModel
      .query()
      .findByIds(ids)
      .withGraphJoined('userDetails.[avatar]')
      .castTo<UsersGetResponseDto[]>()
      .execute();
  }

  public getByIdMoneyBalance(id: number): Promise<NumericalValueContainer> {
    return this.#UserModel
      .query()
      .select('userDetails.moneyBalance as value')
      .findById(id)
      .withGraphJoined('userDetails')
      .castTo<NumericalValueContainer>()
      .execute();
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
