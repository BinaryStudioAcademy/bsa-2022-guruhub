import Config from 'react-native-config';

const { API_ORIGIN_URL, APP_HOST, APP_SCHEME, REACT_APP_STRIPE_PUBLIC_KEY } =
  Config;

const ENV = {
  APP: {
    API_PATH: API_ORIGIN_URL ?? '',
    APP_HOST: APP_HOST ?? '',
    APP_SCHEME: APP_SCHEME ?? '',
    REPLENISH_PUBLIC_KEY: REACT_APP_STRIPE_PUBLIC_KEY ?? '',
  },
} as const;

export { ENV };
