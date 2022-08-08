import { ENV } from '~/common/enums/enums';
import { Http } from './http/http.service';
import { AuthApi } from './auth-api/auth-api.service';
import { Notification } from './notification/notification.service';

const http = new Http();

const authApi = new AuthApi({
  http,
  apiPrefix: ENV.APP.API_PATH,
});

const notificationApi = new Notification();

export { authApi, notificationApi };
