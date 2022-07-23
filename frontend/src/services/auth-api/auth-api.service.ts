import {
	ApiPath,
	AuthApiPath,
	HttpMethod
} from 'common/enums/enums';
import { User, CreateUserPayload } from 'common/types/user/user';
import { Http } from '../http/http.service';

type Constructor = {
	http: Http;
	apiPrefix: string;
};

class AuthApi {
	#http: Http;
	#apiPrefix: string;

	constructor({ http, apiPrefix }: Constructor) {
	this.#http = http;
	this.#apiPrefix = apiPrefix;
	}

	public signUp(payload: CreateUserPayload): Promise<User> {
		return this.#http.load(
			`${this.#apiPrefix}${ApiPath.AUTH}${AuthApiPath.SIGN_UP}`,
			{ method: HttpMethod.POST, payload: JSON.stringify(payload) }
		);
	}
}

export { AuthApi };
