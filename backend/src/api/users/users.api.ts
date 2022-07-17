import { FastifyPluginAsync } from 'fastify';
import { user as userService } from '~/services/services';
import { HttpCode, HttpMethod, UsersApiPath } from '~/common/enums/enums';

type Options = {
	services: {
		user: typeof userService;
	};
};

const initUsersApi: FastifyPluginAsync<Options> = async (fastify, opts) => {
	const { user: userService } = opts.services;

	fastify.route({
		method: HttpMethod.GET,
		url: UsersApiPath.ROOT,
		async handler(_req, rep) {
			return rep.send(await userService.getAll()).status(HttpCode.OK);
		}
	});
};

export { initUsersApi };
