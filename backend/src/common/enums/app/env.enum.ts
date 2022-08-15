import { config } from 'dotenv';

import { AppEnvironment } from './app-environment.enum';

config();

const {
  NODE_ENV,
  PORT,
  DATABASE_URL,
  DB_POOL_MIN,
  DB_POOL_MAX,
  DB_DIALECT,
  SECRET_KEY,
  UDEMY_CLIENT_ID,
  UDEMY_CLIENT_SECRET,
  UDEMY_BASE_URL,
} = process.env;

const ENV = {
  APP: {
    NODE_ENV: <AppEnvironment>NODE_ENV,
    SERVER_PORT: Number(PORT),
  },
  DB: {
    CONNECTION_STRING: DATABASE_URL,
    POOL_MIN: Number(DB_POOL_MIN),
    POOL_MAX: Number(DB_POOL_MAX),
    DIALECT: DB_DIALECT,
  },
  API: {
    V1_PREFIX: '/api/v1',
  },
  JWT: {
    SECRET: SECRET_KEY as string,
    EXPIRES_IN: '24h',
    ALG: 'HS256',
  },
  UDEMY: {
    BASE_URL: UDEMY_BASE_URL as string,
    CLIENT_ID: UDEMY_CLIENT_ID as string,
    CLIENT_SECRET: UDEMY_CLIENT_SECRET as string,
  },
};

export { ENV };
