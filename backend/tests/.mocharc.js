const { getTestsConfigFilePath } = require('./tests-config.js');

const SECOND = 1000;
const TESTS_CONFIG = process.env.TESTS_CONFIG;

module.exports = {
  require: [
    'ts-node/register',
    'tsconfig-paths/register',
    'source-map-support/register',
    getTestsConfigFilePath(TESTS_CONFIG),
    '~/setup.ts',
  ],
  timeout: 20 * SECOND,
  bail: false,
  parallel: false,
  spec: ['./src/tests/specs/**/*.spec.ts'],
};
