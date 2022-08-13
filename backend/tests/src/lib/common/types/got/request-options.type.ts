import { Options as GotRequestOptions } from 'got';

type RequestOptions = GotRequestOptions & {
  noAutoAuth?: boolean;
  startTimeMs?: number;
};

export { type RequestOptions };
