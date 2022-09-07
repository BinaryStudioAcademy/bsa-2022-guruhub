import fastifyMultipart from '@fastify/multipart';
import fastifyStatic from '@fastify/static';
import fastifySwagger from '@fastify/swagger';
import Fastify from 'fastify';
import Knex from 'knex';
import path from 'node:path';
import { Model } from 'objection';

import { initApi } from '~/api/api';
import { ENV, FileSizeBytesValue } from '~/common/enums/enums';

import knexConfig from '../knexfile';

const app = Fastify({
  logger: {
    transport: {
      target: 'pino-pretty',
    },
  },
});

Model.knex(Knex(knexConfig[ENV.APP.NODE_ENV]));

app.register(fastifyMultipart, {
  limits: {
    fileSize: FileSizeBytesValue.ONE_MB,
  },
  attachFieldsToBody: true,
  throwFileSizeLimit: false,
});

app.register(initApi, {
  prefix: ENV.API.V1_PREFIX,
});

const staticPath = path.join(__dirname, '../public');
app.register(fastifyStatic, {
  root: staticPath,
  prefix: '/',
});
app.setNotFoundHandler((_req, res) => {
  res.sendFile('index.html', staticPath);
});

app.register(fastifySwagger, {
  mode: 'static',
  prefix: '/documentation',
  exposeRoute: true,
  specification: {
    path: path.resolve(__dirname, './documentation/documentation.yaml'),
    baseDir: path.resolve(__dirname, './documentation'),
  },
});

app.listen({ port: ENV.APP.SERVER_PORT }, (err, address) => {
  if (err) {
    app.log.error(err);
  }

  app.log.info(`Listening on: ${address}; Environment: ${ENV.APP.NODE_ENV}`);
});
