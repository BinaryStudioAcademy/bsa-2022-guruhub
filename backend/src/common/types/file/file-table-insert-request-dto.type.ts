import { ContentType } from '~/common/enums/enums';

type FileTableInsertRequestDto = {
  url: string;
  contentType: ContentType;
};

export { type FileTableInsertRequestDto };
