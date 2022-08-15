const CONFIGS = ['development', 'staging', 'production'];
const DEFAULT_CONFIG = 'development';

function getTestsConfigFilePath(envTestsConfig) {
  if (!CONFIGS.includes(envTestsConfig)) {
    console.warn(
      `${envTestsConfig ? 'Invalid' : 'No'} test config name was passed.`,
      `Using the default one - ${DEFAULT_CONFIG}.`,
    );

    envTestsConfig = 'development';
  }

  return `~/configs/${envTestsConfig}.config.ts`;
}

module.exports = { getTestsConfigFilePath };
