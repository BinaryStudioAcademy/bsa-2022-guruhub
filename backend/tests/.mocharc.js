const SECOND = 1000;

module.exports = {
  require: [
    'ts-node/register',
    'tsconfig-paths/register',
    'source-map-support/register',
    '~/setup.ts',
  ],
  timeout: 20 * SECOND,
  slow: 7 * SECOND,
  bail: false,
  parallel: false,
  spec: ['./src/tests/specs/**/*.spec.ts'],
};
