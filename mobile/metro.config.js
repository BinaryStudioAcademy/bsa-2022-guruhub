const path = require('path');
const { getDefaultValues } = require('metro-config/src/defaults');

const PATH_TO_NODE_MODULES = path.resolve(__dirname, './node_modules');
const PATH_TO_SHARED = path.resolve(__dirname, '../shared/build');

const extraNodeModules = {
  'guruhub-shared': PATH_TO_SHARED,
};

module.exports = (async () => {
  const {
    resolver: { sourceExts, assetExts },
  } = await getDefaultValues();
  return {
    transformer: {
      babelTransformerPath: require.resolve('react-native-svg-transformer'),
      getTransformOptions: async () => ({
        transform: {
          experimentalImportSupport: false,
          inlineRequires: true,
        },
      }),
    },
    resolver: {
      assetExts: assetExts.filter((ext) => ext !== 'svg'),
      sourceExts: [...sourceExts, 'svg'],
      extraNodeModules: new Proxy(extraNodeModules, {
        get: (target, name) => {
          return target[name] ?? path.join(PATH_TO_NODE_MODULES, name);
        },
      }),
    },
    watchFolders: [PATH_TO_NODE_MODULES, PATH_TO_SHARED],
  };
})();
