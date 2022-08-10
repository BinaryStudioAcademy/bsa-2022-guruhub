const { getDefaultConfig } = require('metro-config');
const { mergeConfig } = require('metro-config');
const path = require('path');

const PATH_TO_NODE_MODULES = path.resolve(__dirname, './node_modules');
const PATH_TO_SHARED = path.resolve(__dirname, '../shared/build');

const extraNodeModules = {
  'guruhub-shared': PATH_TO_SHARED,
};

const configA = {
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
        return target[name] ?? path.join(PATH_TO_NODE_MODULES, name);
      },
    }),
  },
  watchFolders: [PATH_TO_NODE_MODULES, PATH_TO_SHARED],
};

const configB = (async () => {
  const {
    resolver: { sourceExts, assetExts }
  } = await getDefaultConfig();
  return {
    transformer: {
      babelTransformerPath: require.resolve("react-native-svg-transformer")
    },
    resolver: {
      assetExts: assetExts.filter(ext => ext !== 'svg'),
      sourceExts: [...sourceExts, "svg"]
    }
  };
})();

module.exports = mergeConfig(configA, configB);
