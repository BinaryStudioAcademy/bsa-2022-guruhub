const setTestsConfig = (config: typeof global.testsConfig): void => {
  global.testsConfig = config;
};

export { setTestsConfig };
