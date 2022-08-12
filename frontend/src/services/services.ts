import { ENV } from 'common/enums/enums';

import { AuthApi } from './auth-api/auth-api.service';
import { GroupsApi } from './groups/groups.service';
import { Http } from './http/http.service';
import { Notification } from './notification/notification.service';
import { PermissionsApi } from './permissions/permissions.service';
import { Storage } from './storage/storage.service';
import { UsersApi } from './users/users.service';

const storage = new Storage({ storage: localStorage });

const http = new Http({ storage });

const authApi = new AuthApi({
  apiPrefix: ENV.API_PATH,
  http,
});

const notification = new Notification();

const usersApi = new UsersApi({
  apiPrefix: ENV.API_PATH,
  http,
});

const groupsApi = new GroupsApi({
  apiPrefix: ENV.API_PATH,
  http,
});

const permissionsApi = new PermissionsApi({
  apiPrefix: ENV.API_PATH,
  http,
});

export { authApi, groupsApi, notification, permissionsApi, storage, usersApi };
