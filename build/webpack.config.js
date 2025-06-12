const path = require('path');
const glob = require('glob');
const TerserPlugin = require('terser-webpack-plugin');

// 自动获取所有ts文件作为入口
const entries = glob.sync('./src/**/*.ts').reduce((acc, file) => {
  const relativePath = path.relative('./src', file);
  const entryName = relativePath.replace(/\.ts$/, '').replace(/\\/g, '/');
  acc[entryName] = './' + file; // 关键修改：添加'./'前缀
  return acc;
}, {});

module.exports = {
  mode: 'development', // 添加模式设置
  context: path.resolve(__dirname, '../'), // 添加上下文设置
  entry: entries,
  output: {
    filename: '[name].min.js',
    path: path.resolve(__dirname, '../dist')
  },
  resolve: {
    extensions: ['.ts', '.js'],
    preferRelative: true // 启用相对路径解析
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
    minimizer: [
      new TerserPlugin({
        extractComments: false, // 禁用注释提取
        terserOptions: {
          format: {
            comments: false // 完全移除注释
          }
        }
      })
    ]
  }
};