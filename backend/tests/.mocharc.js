const path = require('path');
const { getTestsConfigFilePath } = require('./tests-config.js');

const SECOND = 1000;
const TESTS_CONFIG = process.env.TESTS_CONFIG;
const REPORTERRC = path.resolve(__dirname, '.reporterrc.json');

module.exports = {
  require: [
    'ts-node/register',
    'tsconfig-paths/register',
    'source-map-support/register',
    getTestsConfigFilePath(TESTS_CONFIG),
    '~/setup.ts',
  ],
  timeout: 20 * SECOND,
  slow: 7 * SECOND,
  bail: false,
  parallel: false,
  jobs: 1,
  spec: ['./src/tests/specs/**/*.spec.ts'],
  reporter: 'mocha-multi-reporters',
  'reporter-options': `configFile=${REPORTERRC}`,
};
