import Fastify from 'fastify';
import Knex from 'knex';
import { Model } from 'objection';

import { ENV } from '~/common/enums/enums';
import { initApi } from '~/api/api';
import knexConfig from '../knexfile';

const app = Fastify({
	logger: {
		transport: {
			target: 'pino-pretty'
		}
	}
});

Model.knex(Knex(knexConfig[ENV.APP.NODE_ENV]));

app.register(initApi, {
	prefix: ENV.API.V1_PREFIX
});

app.listen({ port: ENV.APP.SERVER_PORT }, (err, address) => {
	if (err) {
		app.log.error(err);
	}

	app.log.info(`Listening on: ${address}; Environment: ${ENV.APP.NODE_ENV}`);
});
