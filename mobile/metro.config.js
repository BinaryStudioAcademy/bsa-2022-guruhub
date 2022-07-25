const path = require('path');

const guruhubSharedPath = path.resolve(__dirname, '../shared/build');

const extraNodeModules = {
  'guruhub-shared': guruhubSharedPath,
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
        if (name in target) {
          return target[name];
        }

        return path.join(process.cwd(), `node_modules/${String(name)}`);
      },
    }),
  },
  watchFolders: [guruhubSharedPath],
};
