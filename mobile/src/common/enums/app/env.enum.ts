import Config from 'react-native-config';

const { API_ORIGIN_URL } = Config;

const ENV = {
  APP: {
    API_PATH: API_ORIGIN_URL ?? '',
  },
} as const;

export { ENV };
