const path = require('path');
const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const port = process.env.PORT || 3000;

app.use(express.static('client/dist'));
app.get('*', (req, res) => res.sendFile(path.resolve(__dirname, 'client', 'dist', 'index.html')));

http.listen(port, function () {
  console.log(`listening on *:${port}`);
});

io.on('connection', function (socket) {
  console.log('a user connected');
  socket.on('disconnect', function () {
    console.log('user disconnected');
  });
});

io.on('connection', function (socket) {
  socket.on('chat message', function (msg) {
    console.log(msg)
    io.emit('chat message', msg);
  });
});