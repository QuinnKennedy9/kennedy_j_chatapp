const express = require('express');
const app = express();
const io = require('socket.io')();

const PORT = process.env.port || 3000;

var usernames = [];
var colours = [];

app.use(express.static('public'));

app.use(require('./routes/index'));
app.use(require('./routes/contact'));
app.use(require('./routes/users'));

const server = app.listen(3000, function() {
  console.log('listening on localhost:3000');
});

io.attach(server);

io.on('connection', function(socket) {
  console.log('a user has connected');
  //io.emit('chat message', { for: 'everyone', message: `${socket.id} has joined the chat.`});

  socket.on('chat message', function(msg) {
    io.emit('chat message', {for: 'everyone', message: msg });
  });

  socket.on('set nickname', function(nickName){
    usernames.push(nickName);
    console.log(usernames);
  });

  socket.on('set colour', function(colour){
    colours.push(colour);
    console.log(colours);
  });


  socket.on('disconnect', function() {
    console.log('a user has disconnected');
    msg = `${socket.id} has exited the chat`;
    io.emit('disconnect message', msg);
  });
});
