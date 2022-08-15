import { Response as GotResponse } from 'got';

type Response<T = unknown> = GotResponse<T> & {
  durationMs: number;
};

export { type Response };
