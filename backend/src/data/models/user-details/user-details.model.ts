import { DbTableName } from '~/common/enums/enums';

import { Abstract } from '../abstract/abstract.model';

class UserDetails extends Abstract {
  public 'firstName': string;

  public 'lastName': string;

  public 'fullName': string;

  public 'gender': string;

  public 'avatarUrl': string;

  public 'dateOfBirth': string;

  public 'userId': number;

  public static override get tableName(): string {
    return DbTableName.USER_DETAILS;
  }
}

export { UserDetails };
