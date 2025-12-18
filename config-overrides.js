const path = require("path");

module.exports = function override(config) {
  if (!config.resolve.fallback) {
    config.resolve.fallback = {};
  }

  Object.assign(config.resolve.fallback, {
    crypto: require.resolve("crypto-browserify"),
    stream: require.resolve("stream-browserify"),
  });

  return config;
};
