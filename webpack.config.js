const path = require('path');
const MiniCss = require('mini-css-extract-plugin');
const CopyPlugin = require("copy-webpack-plugin");
// const HtmlWebpackPlugin = require('html-webpack-plugin');
const { HotModuleReplacementPlugin } = require('webpack');

module.exports = {
  entry: './src/index.js', // точка входа в приложение
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/'
  },
  devServer: {
    contentBase: path.resolve(__dirname, 'dist'),
    historyApiFallback: true,
    open: true,
    hot: true,
    port: 8888
  },
  module: {
    rules: [{
      test: /\.(s*)css$/,
      use: [
        MiniCss.loader,
        'css-loader',
        {
          loader: "postcss-loader",
          options: {
            postcssOptions: {
              plugins: [
                [
                  "postcss-preset-env",
                ],
              ],
            },
          },
        },
        'sass-loader',
        'resolve-url-loader'
      ]
    },
    {
      test: /\.(png|jpe?g|gif)$/i,
      use: [
        {
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
            outputPath: 'images/'
          }
        },
      ],
    },
    {
      test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
      use: [
        {
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
            outputPath: 'fonts/'
          }
        }
      ]
    }
    ]
  },
  plugins: [
    new MiniCss({
      filename: 'style.css',
    }),
    new CopyPlugin({
      patterns: [
        { from: "src/img", to: "images" },
      ],
    }),
    // new HtmlWebpackPlugin({
    //   title: 'Extraodinary',
    //   template: path.resolve(__dirname, 'src', 'index.html')
    // }),
    new HotModuleReplacementPlugin()
  ],
  resolve: {
    alias: {
      assets: path.resolve(__dirname, 'src')
    }
  }
};