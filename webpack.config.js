const path = require('path');
const MiniCss = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const target = process.env.NODE_ENV === "production" ? "browserslist" : "web";

module.exports = {
  entry: {
    'index': './src/index.js',
    'detail': './src/detail.js'
  }, 
  // output: {
  //   filename: 'bundle.js',
  //   path: path.resolve(__dirname, 'dist'),
  //   publicPath: '/'
  // },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
    chunkFilename: '[id].[chunkhash].js'
  },
  devServer: {
    contentBase: path.resolve(__dirname, 'dist')
  },
  target: target,
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
        // 'sass-loader',
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
      filename: '[name].css',
    }),
    new CopyPlugin({
      patterns: [
        { from: "src/img", to: "images" },
      ]
    }),
    new HtmlWebpackPlugin({
      title: 'Extraordinary',
      chunks: ['index'],
      filename: 'index.html',
      template: path.resolve(__dirname, 'src', 'index.html')
    }),
    new HtmlWebpackPlugin({
      title: 'Extraordinary',
      chunks: ['detail'],
      filename: 'detail.html',
      template: path.resolve(__dirname, 'src', 'detail.html')
    })
    // new HotModuleReplacementPlugin()
  ],
  resolve: {
    alias: {
      assets: path.resolve(__dirname, 'src')
    }
  }
};