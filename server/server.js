
console.log("hello");

var express = require('express');
var app = express();
var server = require('http').Server(app);
//var io = require('socket.io').listen(server);
var ws = require('ws');
var path = require('path');

app.use(express.static(path.resolve('./client/src')));

app.get('/',function(req,res){
	res.sendFile(path.resolve('./client/src/index.html'));
});

var players = {};


const wss = new ws.Server({
	server
});

wss.on('connection', function connection(ws) {
  ws.on('message', function incoming(message) {
    console.log('received: %s', message);
  });
 
  ws.send('something');
});
import x from './commands/gameCommands.js';
var y = new x();
//console.log(y.gameStart()); 

//import * as gameLobbyCommands from './commands/gameLobbyCommands.js';

/*io.on('connection', function(socket){
	console.log('a user connected');
	//console.log(x.gameStart());

	socket.on('disconnect', function(){
		console.log('user disconnected');
	});
});*/

server.listen(8080, function(){
	console.log(`listening on ${server.address().port}`);
});