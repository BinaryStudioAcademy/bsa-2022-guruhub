const path = require('path');

const PATH_TO_SHARED = path.join(__dirname, '/../shared/build');

const extraNodeModules = {
  'guruhub-shared': path.resolve(PATH_TO_SHARED),
};

module.exports = {
  transformer: {
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: true,
      },
    }),
  },
  resolver: {
    extraNodeModules: new Proxy(extraNodeModules, {
      get: (target, name) => {
        return target[name] ?? path.resolve(__dirname, `node_modules/${name}`);
      },
    }),
  },
  watchFolders: [
    path.resolve(__dirname, './node_modules'),
    path.resolve(PATH_TO_SHARED),
  ],
};
