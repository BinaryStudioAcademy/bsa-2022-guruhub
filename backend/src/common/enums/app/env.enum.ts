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
    V1_PREFIX: '/api/v1/',
  },
  JWT: {
    SECRET: SECRET_KEY,
    EXPIRES_IN: '24h',
    ALG: 'HS256',
  },
};

export { ENV };
