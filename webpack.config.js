const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: './src/index.js', // adjust if your main file is different
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  resolve: {
    fallback: {
      crypto: require.resolve('crypto-browserify'),
      stream: require.resolve('stream-browserify'),
      buffer: require.resolve('buffer/'), // needed by some packages
      assert: require.resolve('assert/'), // optional, if required
      http: require.resolve('stream-http'), // optional, if required
      https: require.resolve('https-browserify'), // optional, if required
      os: require.resolve('os-browserify/browser'), // optional
      url: require.resolve('url/'), // optional
    },
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader', // if using Babel
        },
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'], // if using CSS
      },
    ],
  },
  plugins: [
    new webpack.ProvidePlugin({
      Buffer: ['buffer', 'Buffer'],
      process: 'process/browser',
    }),
  ],
  devServer: {
    static: './dist',
    hot: true,
  },
  mode: 'development', // change to 'production' when deploying
};
