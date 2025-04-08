const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

config.resolver.alias = {
  '@components': require('path').resolve(__dirname, 'components'),
};

module.exports = config;
