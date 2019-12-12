const path = require('path');
const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');

module.exports = {
   entry: {
     server: './server.js',
   },
   output: {
      path: path.join(__dirname, 'build'),
      publicPath: '/',
      filename: '[name].js',
   },
   target: 'node',
   node: {
      __dirname: false,
      __filename: false,
   },
    externals: [nodeExternals()],
};
