import { ContentType, DbTableName } from '~/common/enums/enums';

import { Abstract } from '../abstract/abstract.model';

class File extends Abstract {
  public 'url': string;

  public 'contentType': ContentType;

  public static override get tableName(): string {
    return DbTableName.FILES;
  }
}

export { File };
