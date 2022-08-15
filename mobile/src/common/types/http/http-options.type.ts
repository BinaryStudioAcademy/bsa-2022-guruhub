import { ContentType, HttpMethod } from '~/common/enums/enums';

type HttpOptions = {
  method: HttpMethod;
  contentType: ContentType;
  payload: BodyInit | null;
  hasAuth?: boolean;
  queryParams?: Record<string, unknown> | undefined;
};

export { type HttpOptions };
