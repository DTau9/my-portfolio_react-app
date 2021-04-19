const path = require("path");
const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

let mode = "development";
let target = "web";
const plugins = [
  new CleanWebpackPlugin(),
  new MiniCssExtractPlugin(),
  new HtmlWebpackPlugin({
    template: "./src/index.html",
  }),
];

if (process.env.NODE_ENV === "production") {
  mode = "production";
  // Temporary workaround for 'browserslist' bug that is being patched in the near future
  target = "browserslist";
}

if (process.env.SERVE) {
  // We only want React Hot Reloading in serve mode
  plugins.push(new ReactRefreshWebpackPlugin());
}

module.exports = {
  // mode defaults to 'production' if not set
  mode: mode,

  // This is unnecessary in Webpack 5, because it's the default.
  // However, react-refresh-webpack-plugin can't find the entry without it.
  entry: "./src/index.js",

  output: {
    // output path is required for `clean-webpack-plugin`
    path: path.resolve(__dirname, "dist"),
    // this places all images processed in an image folder
    assetModuleFilename: "images/[hash][ext][query]",
  },

  module: {
    rules: [
      {
        test: /\.(s[ac]|c)ss$/i,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            // This is required for asset imports in CSS, such as url()
            options: { publicPath: "" },
          },
          "css-loader",
          "postcss-loader",
          // according to the docs, sass-loader should be at the bottom, which
          // loads it first to avoid prefixes in your sourcemaps and other issues.
          "sass-loader",
        ],
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        /**
         * The `type` setting replaces the need for "url-loader"
         * and "file-loader" in Webpack 5.
         *
         * setting `type` to "asset" will automatically pick between
         * outputing images to a file, or inlining them in the bundle as base64
         * with a default max inline size of 8kb
         */
        type: "asset",

        /**
         * If you want to inline larger images, you can set
         * a custom `maxSize` for inline like so:
         */
        // parser: {
        //   dataUrlCondition: {
        //     maxSize: 30 * 1024,
        //   },
        // },
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          // without additional settings, this will reference .babelrc
          loader: "babel-loader",
          options: {
            /**
             * From the docs: When set, the given directory will be used
             * to cache the results of the loader. Future webpack builds
             * will attempt to read from the cache to avoid needing to run
             * the potentially expensive Babel recompilation process on each run.
             */
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

  // required if using webpack-dev-server
  devServer: {
    contentBase: "./dist",
    hot: true,
  },
};











// const path = require('path');
// const MiniCssExtractPlugin = require('mini-css-extract-plugin');

// let config = {
//   context: path.resolve(__dirname, 'src'),
//   entry: './index.jsx',
//   output: {
//     path: path.resolve(__dirname, './dist'),
//     filename: 'bundle.js',
//     publicPath: '/dist/'
//   },
//   devServer: {
//     compress: true,
//     historyApiFallback: true,
//     overlay: true,
//     hot: true,
//     liveReload: false,
//   },
//   module: {
//     rules: [
//       {
//         test: /\.(js|jsx)$/,
//         loader: 'babel-loader',
//         exclude: '/node_modules/'
//       },
//       {
//         test: /\.module\.css$/,
//         use: [
//           MiniCssExtractPlugin.loader,
//           {
//             loader: 'css-loader',
//             options: {
//               modules: {
//                 localIdentName: '[local]__[sha1:hash:hex:7]',
//               },
//             },
//           }
//         ],
//       },
//       {
//         test: /^((?!\.module).)*css$/,
//         use: [MiniCssExtractPlugin.loader, 'css-loader'],
//       },
//       {
//         test: /\.(png|jpe?g|gif|svg|ico|eot|ttf|woff|woff2)$/i,
//         type: 'asset/resource',
//         generator: {
//           filename: 'images/[hash][ext][query]'
//         },
//         use: [
//           {
//             loader: 'image-webpack-loader',
//             options: {
//               mozJpeg: {
//                 progressive: true,
//                 quality: 70
//               }
//             }
//           }]
//       }
//     ]
//   },
//   resolve: {
//     extensions: [".js", ".jsx"],
//   },
//   plugins: [
//     new MiniCssExtractPlugin({
//       filename: 'boundle.css'
//     })
//   ]
// }

// module.exports = (env, options) => {
//   let isProd = options.mode === 'production';
//   config.devtool = isProd ? false : 'eval-cheap-module-source-map'
//   // пока не пофиксят баг с webpack-dev-server (в 4 версии должны испрвить)
//   config.target = isProd ? 'browserslist' : 'web'
//   return config;
// };

