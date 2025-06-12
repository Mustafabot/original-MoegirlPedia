const path = require('path');
const glob = require('glob');
const TerserPlugin = require('terser-webpack-plugin');

// 自动获取所有ts文件作为入口
const entries = glob.sync('./src/**/*.ts').reduce((acc, file) => {
  const relativePath = path.relative('./src', file);
  const entryName = relativePath.replace(/\.ts$/, '').replace(/\\/g, '/');
  acc[entryName] = file;
  return acc;
}, {});

module.exports = {
  entry: entries,
  output: {
    filename: '[name].min.js',
    path: path.resolve(__dirname, '/../dist')
  },
  resolve: {
    extensions: ['.ts', '.js']
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/
      }
    ]
  },
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin()]
  }
};