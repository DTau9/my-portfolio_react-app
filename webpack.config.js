const path = require("path");
const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const miniSVGDataURI = require('mini-svg-data-uri');
const ImageMinimizerPlugin = require('image-minimizer-webpack-plugin');

let mode = "development";
let target = "web";

const isEnvProduction = process.env.NODE_ENV === 'production';

const plugins = [
  new CleanWebpackPlugin(),
  new MiniCssExtractPlugin(),
  new HtmlWebpackPlugin({
    template: "./src/template.html",
    favicon: "./src/images/favicon.ico"
  })
];

if (isEnvProduction) {
  mode = "production";
  target = "browserslist";
}

if (process.env.SERVE) {
  plugins.push(new ReactRefreshWebpackPlugin());
}

module.exports = {
  mode: mode,
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "build"),
    filename: 'static/js/[name].bundle.js',
    chunkFilename: isEnvProduction
      ? 'static/js/[name].[contenthash:8].chunk.js'
      : 'static/js/[name].chunk.js',
    publicPath: isEnvProduction ? '' : '/',
    assetModuleFilename: "static/images/[hash][ext][query]",
  },

  module: {
    rules: [
      {
        test: /\.module\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              modules: {
                localIdentName: '[local]__[sha1:hash:hex:7]',
              },
            },
          },
          'postcss-loader'
        ],
      },
      {
        test: /^((?!\.module).)*css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: { publicPath: '' }
          },
          'css-loader',
          'postcss-loader'
        ],
      },
      {
        test: /\.svg$/i,
        type: "asset/inline",
        generator: {
          dataUrl(content) {
            content = content.toString();
            return miniSVGDataURI(content);
          }
        },
        use: "svgo-loader"
      },
      {
        test: /\.(png|jpe?g|gif|ico)$/i,
        type: "asset",
        use: [

          {
            loader: ImageMinimizerPlugin.loader,
            options: {
              minimizerOptions: {
                plugins: [
                  ["mozjpeg", {
                    progressive: true,
                    quality: 50
                  }]
                ],
              },
            }
          }
        ]
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            cacheDirectory: true,
          },
        },
      },
    ],
  },

  plugins: plugins,

  target: target,

  devtool: "source-map",

  resolve: {
    extensions: [".js", ".jsx"],
  },

  devServer: {
    contentBase: path.join(__dirname, 'build'),
    hot: true,
  },
};
