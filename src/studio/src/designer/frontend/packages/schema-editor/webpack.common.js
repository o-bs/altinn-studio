const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const webpackRoot = require('../../webpack.frontend.js');

module.exports = {
  ...webpackRoot,
  entry: './src/index.ts',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'index.js',
  },
  module: {
    ...webpackRoot.module,
    rules: [
      ...webpackRoot.module.rules,
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'schemaEditor.css',
    }),
  ],
};
