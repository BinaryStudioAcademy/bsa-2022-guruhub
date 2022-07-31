import Fastify from 'fastify';
import fastifyStatic from '@fastify/static';
import Knex from 'knex';
import { Model } from 'objection';
import path from 'path';

import { initApi } from '~/api/api';
import { ENV } from '~/common/enums/enums';
import knexConfig from '../knexfile';

const app = Fastify({
  logger: {
    transport: {
      target: 'pino-pretty',
    },
  },
});

Model.knex(Knex(knexConfig[ENV.APP.NODE_ENV]));

app.register(initApi, {
  prefix: ENV.API.V1_PREFIX,
});

const staticPath = path.join(__dirname, '../public');
app.register(fastifyStatic, {
  root: staticPath,
  prefix: '/',
});

app.listen({ port: ENV.APP.SERVER_PORT }, (err, address) => {
  if (err) {
    app.log.error(err);
  }

  app.log.info(`Listening on: ${address}; Environment: ${ENV.APP.NODE_ENV}`);
});
