import { Knex } from 'knex';
import { knexSnakeCaseMappers } from 'objection';

import { AppEnvironment, ENV, DbTableName } from './src/common/enums/enums';

type ConfigPropType = Record<string, unknown>;

const DEFAULT_ENV_CONFIG: Knex.Config<ConfigPropType> = {
  client: ENV.DB.DIALECT,
  connection: ENV.DB.CONNECTION_STRING,
  pool: {
    min: ENV.DB.POOL_MIN,
    max: ENV.DB.POOL_MIN,
  },
  migrations: {
    directory: './src/data/migrations',
    tableName: DbTableName.MIGRATIONS,
  },
  seeds: {
    directory: './src/data/migrations/seeds',
  },
  debug: false,
  ...knexSnakeCaseMappers({ underscoreBetweenUppercaseLetters: true }),
};

const knexConfig: Record<AppEnvironment, Knex.Config<ConfigPropType>> = {
  [AppEnvironment.DEVELOPMENT]: DEFAULT_ENV_CONFIG,
  [AppEnvironment.PRODUCTION]: DEFAULT_ENV_CONFIG,
};

export default knexConfig;
