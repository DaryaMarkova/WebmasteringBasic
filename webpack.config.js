const path = require('path');
const MiniCss = require('mini-css-extract-plugin');
const CopyPlugin = require("copy-webpack-plugin");
const autoprefixer = require('autoprefixer');
const { webpack } = require('webpack');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [{
      test: /\.(s*)css$/,
      use: [
        MiniCss.loader,
        'css-loader',
        'sass-loader',
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
    })
  ],
  resolve: {
    alias: {
      assets: path.resolve(__dirname, 'src')
    }
  },
  watch: true
};