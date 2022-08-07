import { ENV } from '~/common/enums/app/env.enum';

const linking = {
  prefixes: [ENV.APP.APP_HOST, ENV.APP.APP_SCHEME],
};

export { linking };
