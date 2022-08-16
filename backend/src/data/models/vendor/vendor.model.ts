import { DbTableName } from '~/common/enums/enums';

import { Abstract } from '../abstract/abstract.model';

class Vendor extends Abstract {
  public 'name': string;

  public 'key': string;

  public static override get tableName(): string {
    return DbTableName.VENDORS;
  }
}

export { Vendor };
