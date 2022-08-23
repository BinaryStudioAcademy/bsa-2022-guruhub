import { FileContentType } from '~/common/enums/enums';

type FileTableInsertRequestDto = {
  url: string;
  contentType: FileContentType;
};

export { type FileTableInsertRequestDto };
