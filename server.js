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

// socket.io
const http = require('http').Server(app);
const io = require('socket.io')(http);

io.on('connection', (socket) => {
  console.log('A user connected');
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });

  io.emit('welcomeMessage', {
    id: 1,
    name: 'guest',
    message: 'welcome guest',
    age: 25
  });

});

http.listen(PORT, () => {
  console.log(`Server up on port: ${PORT} \n`);
});
