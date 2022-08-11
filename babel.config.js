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
          blocklist: null,
          allowlist: null,
          safe: false,
          allowUndefined: false,
        },
      ],
      [
        'module-resolver',
        {
          root: ['./'],
          alias: {
            _api: './src/api',
            _services: './src/services',
            _models: './src/models',
            _components: './src/components',
            _features: './src/features',
            _hooks: './src/hooks',
            _navigation: './src/navigation',
            _state: './src/state',
            _utils: './src/utils',
            _context: './src/context',
          },
        },
      ],
      'react-native-reanimated/plugin', // Must be the last plugin
    ],
  }
}
