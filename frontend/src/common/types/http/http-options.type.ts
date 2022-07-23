import { HttpMethod } from 'guruhub-shared/common/enums/http/http';

type HttpOptions = {
	method: HttpMethod;
	payload: BodyInit | null;
};

export { type HttpOptions };
