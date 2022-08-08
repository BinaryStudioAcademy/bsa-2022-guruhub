import { ENV } from '~/common/enums/enums';

const linking = {
  prefixes: [ENV.APP.APP_HOST, ENV.APP.APP_SCHEME],
};

export { linking };
