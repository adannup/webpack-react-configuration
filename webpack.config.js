// Issues: uglify (only in webpack-dev-server): https://github.com/webpack-contrib/uglifyjs-webpack-plugin/issues/132
// devtool: https://webpack.js.org/configuration/devtool/
// react-hot-loader: https://github.com/gaearon/react-hot-loader

// import lib
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const htmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
var OpenBrowserPlugin = require('open-browser-webpack-plugin');

// Production variables
const isProd = process.env.NODE_ENV === "production"; // true or false
const cssDev = ['style-loader', 'css-loader', 'sass-loader'];
const cssProd = ExtractTextPlugin.extract({
  fallback: 'style-loader',
  use: ['css-loader', 'sass-loader'],
  publicPath: '/'
});
const cssConfig = isProd ? cssProd : cssDev;

// Configure plugins
const ExtractTextPluginConfig = new ExtractTextPlugin({
  filename: 'main.css',
  allChunks: true,
  disable: !isProd
});
const htmlWebpackPluginConfig = new htmlWebpackPlugin({
  filename: 'index.html',
  template: path.join(__dirname, 'src/index.html'),
  hash: true,
  minify: {
    collapseWhitespace: isProd
  }
});

// Define plugins to production or developing
const getPlugins = () => {
  const plugins = [
    htmlWebpackPluginConfig,
    ExtractTextPluginConfig,
  ];

  if(!isProd) {
    plugins.push(new webpack.HotModuleReplacementPlugin());
    plugins.push(new OpenBrowserPlugin({ url: 'http://localhost:3000' }));
  }else{
    plugins.push(new CleanWebpackPlugin(['dist']));
  }

  return plugins;
}

module.exports = {
  entry: {
    app: ['react-hot-loader/patch', path.join(__dirname, 'src/js/index.js'), 'webpack-hot-middleware/client'],
  },
  output: {
    filename: '[name].bundle.js',
    path: path.join(__dirname, 'dist'),
    publicPath: '/'
  },
  module: {
    rules:[
      {
        test: /\.scss$/,
        use: cssConfig
      },
      {
        test: /\.js$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              cacheDirectory: true,
              plugins: ["react-hot-loader/babel"],
              presets: [['env', {'modules': false}], 'react']
            },
          }
        ],
        exclude: /node_modules/
      }
    ]
  },
  devtool: 'inline-source-map',
  // OnlyApply for webpack-dev-server
  // devServer: {
  //   contentBase: path.join(__dirname, "dist"),
  //   compress: true,
  //   port: 9000,
  //   open: true,
  //   stats: "errors-only",
  //   hot: true
  // },
  plugins: getPlugins()
}
