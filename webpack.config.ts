const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: { index: './src/index.ts', },
  devServer: {
    static:  path.resolve(__dirname, 'dist'),
		port: 8080,
  },
  devtool: 'inline-source-map',
  plugins: [
    new htmlWebpackPlugin({
      title: 'Battleship',
      template: './public/index.html',
    })
  ],
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.(s[ac]|c)ss$/i,
        use: [ 'style-loader', 'css-loader', 'postcss-loader', 'sass-loader' ],
      },
      {
        test: /\.[jt]s$/i,
        use: ['babel-loader', 'ts-loader'],
        exclude: /node_modules/
      },
      {
        test: /\.(jpe?g|gif|svg|png)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.(ttf|eot|otf|woff2?)$/i,
        type: 'asset/resource',
      }
    ]
  },
  resolve: { extensions: ['.ts', '.js'] },
  optimization: { runtimeChunk: 'single', },
};
