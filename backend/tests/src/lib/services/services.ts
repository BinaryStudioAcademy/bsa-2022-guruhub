import { ApiSession } from '~/lib/common/types/types';
import { SessionStorage } from '~/lib/helpers/helpers';

import { HttpService } from './http/http.service';

const sessionStorage = new SessionStorage<ApiSession>();

const httpService = new HttpService({ sessionStorage });

export { sessionStorage as apiSessionStorage, httpService };
