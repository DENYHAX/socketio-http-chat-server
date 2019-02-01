var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var nickname = 'undefined';
var d = new Date();

function getCurrentTime(){

  result = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' +
  d.getDate() + ' ' + d.getHours() + ':' + d.getMinutes() + ':' +
  d.getSeconds();

  return result;
};

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
  socket.on('disconnect', function(){
    console.log(getCurrentTime() + ' # ' + 'SERVER: ' + this.nickname + ' just disconnected.');
    io.emit('chat message', (getCurrentTime() + ' # ' + 'SERVER: ' + this.nickname + ' just disconnected.'));
  });

  socket.on('nickname', function(nickname){
    this.nickname = nickname;
    console.log(getCurrentTime() + ' # ' + 'SERVER: ' + this.nickname + ' just connected.');
    io.emit('chat message', (getCurrentTime() + ' # ' + 'SERVER: ' + this.nickname + ' just connected.'));
  });

  socket.on('chat message', function(msg){
    console.log(getCurrentTime() + ' # ' + (this.nickname + ': ' + msg));
    io.emit('chat message', (getCurrentTime() + ' # ' + this.nickname + ': ' + msg));
  });

});

http.listen(1337, function(){
  console.log('listening on *:1337');
});
