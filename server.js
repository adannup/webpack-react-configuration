const express = require('express');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');

const app = express();
const config = require('./webpack.config');
const compiler = webpack(config);
const PORT = process.env.PORT || 3000;

// Tell express to use the webpack-dev-middleware and use the webpack.config.js
// configuration file as a base.
app.use(webpackDevMiddleware(compiler, {
  noInfo: true,
  stats: {colors: true},
  publicPath: config.output.publicPath
}));

app.use(webpackHotMiddleware(compiler));

app.listen(PORT, () => {
  console.log(`Server up on port: ${PORT} \n`);
});
