import { Options as GotRequestOptions } from 'got';

type RequestOptions = GotRequestOptions & {
  hasAutoAuth?: boolean;
  startTimeMs?: number;
};

export { type RequestOptions };
