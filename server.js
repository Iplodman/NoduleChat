var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
  console.log('Client connected');
  
  socket.on('message', function(msg){
    console.log(' Message: ' + msg);
	io.emit('message', msg);
  });
  
  socket.on('disconnect', function(){
	console.log('Client disconnected');
  });
  
  socket.on('user join', function(username){
    io.emit('user join', '\'' + username + '\' has joined the room!')
  });
});

http.listen(3000, function(){
  console.log('Listening on port *:3000.');
});
