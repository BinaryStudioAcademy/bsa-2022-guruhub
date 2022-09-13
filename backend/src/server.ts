import fastifyMultipart from '@fastify/multipart';
import fastifyStatic from '@fastify/static';
import fastifySwagger from '@fastify/swagger';
import Fastify from 'fastify';
import http, { RequestListener } from 'http';
import Knex from 'knex';
import path from 'node:path';
import { Model } from 'objection';
import { Server as SocketServer } from 'socket.io';

import { initApi } from '~/api/api';
import { ENV, FileSizeBytesValue, SocketEvent } from '~/common/enums/enums';
import { handlers as socketHandlers } from '~/socket/socket';

import knexConfig from '../knexfile';

const app = Fastify({
  logger: {
    transport: {
      target: 'pino-pretty',
    },
  },
});

const socketServer = new http.Server(app as unknown as RequestListener);

const io = new SocketServer(socketServer, {
  cors: {
    origin: '*',
    credentials: true,
  },
});

Model.knex(Knex(knexConfig[ENV.APP.NODE_ENV]));

io.on(SocketEvent.CONNECTION, socketHandlers);

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

socketServer.listen(ENV.APP.SOCKET_PORT);
