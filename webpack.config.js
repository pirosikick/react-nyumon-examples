'use strict';
var path = require('path');

var isProduction = process.env.NODE_ENV === 'production';
var outputPath = path.join(__dirname, isProduction ? '.tmp' : 'build', 'scripts');
var plugins = [];

if (isProduction) {
  plugins.push(new webpack.optimize.UglifyJsPlugin({}))
}

module.exports = {
  context: __dirname + '/src',
  entry: {
    client: './client',
    "16.1.1": './16.1.1.js',
    "16.1.2": './16.1.2.js',
    "16.1.3": './16.1.3.js',
    "flux": "./flux.js"
  },
  output: {
    path: path.join(
      __dirname,
      isProduction ? 'build' : '.tmp',
      'scripts'
    ),
    filename: "[name].bundle.js"
  },
  module: {
    loaders: [
      { test: /\.jsx?$/, exclude: /node_modules/, loader: 'babel-loader?optional=runtime' }
    ]
  },
  plugins: plugins,
  devtool: 'inline-source-map',
};
