'use strict';

module.exports = {
  entry: './static/_sandbox.js',
  output: { 
    path: __dirname, 
    filename: './static/bundle.js' 
  },
  devtool: "source-map",
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel', // 'babel-loader' is also a valid name to reference 
        query: {
          presets: ['es2015']
        }
      },
      {
        test: /\.sass$/,
        loaders: ['style', 'css?-url', 'sass']
      },
      {
        test: /\.scss$/,
        loaders: ['style', 'css?-url', 'sass']
      },
      {
        test: /\.css$/,
        loaders: ['style', 'css?-url']
      }
    ]
  }
};