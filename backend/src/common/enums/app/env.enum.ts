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
  EDX_CLIENT_ID,
  EDX_CLIENT_SECRET,
  EDX_BASE_URL,
  AWS_ACCESS_KEY_ID,
  AWS_SECRET_ACCESS_KEY,
  AWS_REGION,
  AWS_USERS_FILES_BUCKET_NAME,
  STRIPE_SECRET_KEY,
  STRIPE_OPERATION_REDIRECTION_URL,
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
  EDX: {
    BASE_URL: EDX_BASE_URL as string,
    CLIENT_ID: EDX_CLIENT_ID as string,
    CLIENT_SECRET: EDX_CLIENT_SECRET as string,
  },
  AWS: {
    ACCESS_KEY_ID: AWS_ACCESS_KEY_ID as string,
    SECRET_ACCESS_KEY: AWS_SECRET_ACCESS_KEY as string,
    REGION: AWS_REGION as string,
    USERS_FILES_BUCKET_NAME: AWS_USERS_FILES_BUCKET_NAME as string,
  },
  STRIPE: {
    SECRET_KEY: STRIPE_SECRET_KEY as string,
    OPERATION_REDIRECTION_URL: STRIPE_OPERATION_REDIRECTION_URL as string,
  },
};

export { ENV };
