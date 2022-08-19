import { DbTableName } from '~/common/enums/enums';

import { Abstract } from '../abstract/abstract.model';

class UserWithDetails extends Abstract {
  public 'email': string;

  public 'passwordHash': string;

  public 'passwordSalt': string;

  public 'firstName': string | null;

  public 'lastName': string | null;

  public 'fullName': string;

  public 'gender': string | null;

  public 'avatarUrl': string | null;

  public 'dateOfBirth': string | null;

  public static override get tableName(): string {
    return DbTableName.USER_DETAILS;
  }
}

export { UserWithDetails };
