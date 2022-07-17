import {
	ApiPath,
	HttpMethod,
	UsersApiPath
} from 'common/enums/enums';
import { User } from 'common/types/user/user';
import { Http } from '../http/http.service';

type Constructor = {
	http: Http;
	apiPrefix: string;
};

class UsersApi {
	#http: Http;
	#apiPrefix: string;

	constructor({ http, apiPrefix }: Constructor) {
	this.#http = http;
	this.#apiPrefix = apiPrefix;
	}

	public getAll(): Promise<User[]> {
		return this.#http.load(
			`${this.#apiPrefix}${ApiPath.USERS}${UsersApiPath.ROOT}`,
			{ method: HttpMethod.GET }
		);
	}
}

export { UsersApi };
