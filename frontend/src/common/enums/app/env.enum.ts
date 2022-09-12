const { REACT_APP_API_ORIGIN_URL, STRIPE_PUBLIC_KEY } = process.env;

const ENV = {
  API_PATH: REACT_APP_API_ORIGIN_URL ?? '',
  REPLENISH_PUBLIC_KEY: STRIPE_PUBLIC_KEY ?? '',
} as const;

export { ENV };
