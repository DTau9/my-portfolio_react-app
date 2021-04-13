let path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

let config = {
  entry: './src/index.jsx',
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'main.js',
    publicPath: '/dist/'
  },
  devServer: {
    overlay: true
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        loader: 'babel-loader',
        exclude: '/node_modules/'
      },
      {
        test: /\.module\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              modules: {
                localIdentName: '[local]__[sha1:hash:hex:7]',
              },
            },
          }
        ],
      },
      {
        test: /^((?!\.module).)*css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
      {
        test: /\.(png|jpe?g|gif|svg|eot|ttf|woff|woff2)$/i,
        type: 'asset',
      },
    ]
  },
  resolve: {
    extensions: [".js", ".jsx"],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'main.css'
    })
  ]
}

module.exports = (env, options) => {
  let isProd = options.mode === 'production';
  config.devtool = isProd ? false : 'eval-cheap-module-source-map'
  // пока не пофиксят баг с webpack-dev-server (в 4 версии должны испрвить)
  config.target = isProd ? 'browserslist' : 'web'
  return config;
};

