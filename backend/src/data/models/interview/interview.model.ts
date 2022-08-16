import { DbTableName } from '~/common/enums/enums';

import { Abstract } from '../abstract/abstract.model';

class Interview extends Abstract {
  public 'interview_date': string;

  public 'status': string;

  public static override get tableName(): string {
    return DbTableName.INTERVIEWS;
  }
}

export { Interview };
