import { ENV } from 'common/enums/enums';

import { AuthApi } from './auth-api/auth-api.service';
import { Http } from './http/http.service';
import { Notification } from './notification/notification.service';
import { Storage } from './storage/storage.service';

const storage = new Storage({ storage: localStorage });

const http = new Http({ storage });

const authApi = new AuthApi({
  apiPrefix: ENV.API_PATH,
  http,
});

const notification = new Notification();

export { authApi, notification, storage };
