const path = require('path');
const webpack = require('webpack');
const TersetJSPlugin = require('terser-webpack-plugin');

module.exports = {
  entry: {
    modules: ['react', 'react-dom', 'react-router-dom'],
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'js/[name].[contenthash].dll.js',
    library: '[name]',
  },
  optimization: {
    minimizer: [new TersetJSPlugin()],
  },
  plugins: [
    new webpack.DllPlugin({
      name: '[name]',
      path: path.join(__dirname, '[name].manifest.json'),
    }),
  ],
};
