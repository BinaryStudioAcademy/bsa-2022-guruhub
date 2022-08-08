import { ENV } from 'common/enums/enums';
import { Http } from './http/http.service';
import { AuthApi } from './auth-api/auth-api.service';
import { Storage } from './storage/storage.service';
import { Notification } from './notification/notification.service';

const storage = new Storage({ storage: localStorage });

const http = new Http({ storage });

const authApi = new AuthApi({
  apiPrefix: ENV.API_PATH,
  http,
});

const notification = new Notification();

export { authApi, storage, notification };
