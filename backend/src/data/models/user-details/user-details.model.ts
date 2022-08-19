import { DbTableName } from '~/common/enums/enums';

import { Abstract } from '../abstract/abstract.model';

class UserDetails extends Abstract {
  public 'fullName': string;

  public 'gender': string | null;

  public 'avatarUrl': string | null;

  public 'dateOfBirth': string | null;

  public 'userId': number;

  public static override get tableName(): string {
    return DbTableName.USER_DETAILS;
  }
}

export { UserDetails };
