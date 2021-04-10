module.exports = function (api) {
  api.cache(true)
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module:react-native-dotenv',
        {
          moduleName: '@env',
          path: '.env',
          blacklist: null,
          whitelist: null,
          safe: false,
          allowUndefined: false,
        },
      ],
      [
        'module-resolver',
        {
          root: ['./'],
          alias: {
            _selectors: './src/selectors',
            _api: './src/api',
            _components: './src/components',
            _features: './src/features',
            _hooks: './src/hooks',
            _navigation: './src/navigation',
            _state: './src/state',
            _utils: './src/utils',
          },
        },
      ],
    ],
  }
}
