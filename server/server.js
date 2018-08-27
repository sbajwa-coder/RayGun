/******************************* THIS SERVER IS PRETENDING TO BE THE WEBSOCKET SERVER ******************/
/*Required modules*/
var express = require('express');
var app = express();
var server = require('http').Server(app);
var websocket = require('ws');
var path = require('path');

/*import static function from command files*/
import game from './commands/gameCommands.js';
import play from './commands/playerCommands.js';
//import lobby from './commands/gameLobbyCommands.js';

/*Objects stored on the server*/
// var players = {};
// var numPlayers = 0;

/*Express setup*/
app.use(express.static(path.resolve('./dist')));
/*app.get('/',function(req,res){
	res.sendFile(path.resolve('./client/src/index.html'));
});*/

/*websocket setup*/
const wss = new websocket.Server({server});

/*Broadcase function*/
wss.broadcast = function (data){
	data = JSON.stringify(data);
	wss.clients.forEach(function (client){
		client.send(data);
	});
}

/*Import for Server functions*/
/*import lobby from './gameLobbyServer.js';
lobby.init(wss);*/
import socketServer from './serverWebsocket.js';

/*websocket messages*/
wss.on('connection', function(ws) {	
  socketServer(ws);
});

wss.on('error', (e)=>console.log(e));

/*Server listening to port 8080*/
server.listen(8080, function(){
	console.log(`listening on ${server.address().port}`);
});