const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

module.exports = {
  entry: './src/emitter.ts',
  output: {
    filename: 'emitter.js',
    path: __dirname + '/dist',
  },

  devtool: 'source-map',

  resolve: {
    extensions: ['.ts'],
  },

  module: {
    rules: [{ test: /\.ts$/, loader: 'awesome-typescript-loader' }],
  },

  plugins: [new UglifyJsPlugin()],
}
