import { ContentType } from '~/common/enums/enums';

type FileUploadRequestDto = {
  bucket: string;
  file: Buffer;
  fileName: string;
  contentType: ContentType;
};

export { type FileUploadRequestDto };
