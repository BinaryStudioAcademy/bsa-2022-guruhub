import { ENV } from 'common/enums/enums';
import { Http } from './http/http.service';
import { AuthApi } from './auth-api/auth-api.service';
import { UsersApi } from './users-api/users-api.service';

const http = new Http();

const authApi = new AuthApi({
	apiPrefix: ENV.API_PATH,
	http
});

const usersApi = new UsersApi({
	apiPrefix: ENV.API_PATH,
	http
});

export { authApi, usersApi };
