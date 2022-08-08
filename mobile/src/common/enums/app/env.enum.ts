import Config from 'react-native-config';

const { API_ORIGIN_URL, APP_HOST, APP_SCHEME } = Config;

const ENV = {
  APP: {
    API_PATH: API_ORIGIN_URL ?? '',
    APP_HOST: APP_HOST ?? '',
    APP_SCHEME: APP_SCHEME ?? '',
  },
} as const;

export { ENV };
