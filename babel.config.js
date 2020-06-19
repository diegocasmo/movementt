module.exports = function (api) {
  api.cache(true)
  return {
    presets: ['babel-preset-expo', 'module:react-native-dotenv'],
    plugins: [
      [
        'module-resolver',
        {
          root: ['./'],
          alias: {
            _api: './src/api',
            _components: './src/components',
            _features: './src/features',
            _hooks: './src/hooks',
            _navigation: './src/navigation',
            _seed: './src/seed',
            _state: './src/state',
            _utils: './src/utils',
          },
        },
      ],
    ],
  }
}
