import { ContentType } from '~/common/enums/enums';

type FileGetResponseDto = {
  id: number;
  url: string;
  contentType: ContentType;
};

export { type FileGetResponseDto };
