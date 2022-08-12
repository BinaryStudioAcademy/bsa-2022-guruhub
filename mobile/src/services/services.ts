import { ENV } from '~/common/enums/enums';

import { MMKV } from '../components/common/common';
import { AuthApi } from './auth-api/auth-api.service';
import { Http } from './http/http.service';
import { Notification } from './notification/notification.service';
import { Storage } from './storage/storage.service';

const storage = new Storage({
  storage: new MMKV(),
});

const http = new Http({ storage });

const authApi = new AuthApi({
  http,
  apiPrefix: ENV.APP.API_PATH,
});

const notification = new Notification();

export { authApi, notification, storage };
