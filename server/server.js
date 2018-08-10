/*Required modules*/
var express = require('express');
var app = express();
var server = require('http').Server(app);
var websocket = require('ws');
var path = require('path');

/*import static function from command files*/
import game from './commands/gameCommands.js';
import play from './commands/playerCommands.js';
import lobby from './commands/gameLobbyCommands.js';

/*Objects stored on the server*/
var players = {};
var numPlayers = 0;

/*Express setup*/
app.use(express.static(path.resolve('./client')));
app.get('/',function(req,res){
	res.sendFile(path.resolve('./client/src/index.html'));
});

/*websocket setup*/
const wss = new websocket.Server({server});

/*Broadcase function*/
wss.broadcast = function (data){
	data = JSON.stringify(data);
	wss.clients.forEach(function (client){
		client.send(data);
	});
}

/*websocket messages*/
wss.on('connection', function(ws) {	
  ws.on('message', function(message) {
  	var data = JSON.parse(message);

  	switch (data.type) {
  		case 'join':
        numPlayers+=1;
        ws.send(JSON.stringify({type:'join', players: players, id:numPlayers}));
  			players[numPlayers] = lobby.join(wss,ws,data,numPlayers);
  			break;
  		case 'leave':
  			lobby.leave(wss,data.id);
  			delete players[data.id];
  			break;
  		case 'ready':
  			lobby.ready(wss,ws,players[ws]);
  			break;
  		
      case 'move':
        var x = players[data.id].x;
        var y = players[data.id].y;
        var angle = players[data.id].angle;

        let opposite = Math.sin(data.rotation) * 3; 
        let adjacent = Math.cos(data.rotation) * 3;

        switch (data.action) {
          case 'left':
             angle-=3;
            break;
           case 'right':
             angle+=3;
            break;
           case 'up':
              x -= opposite;
              y += adjacent;
            break;
           case 'down':
              x -= opposite;
              y += adjacent;
            break;
          default:
            // statements_def
            break;
        }

        players[data.id].x = x;
        players[data.id].y = y;
        players[data.id].angle = angle;
       wss.broadcast({type:'move',x:x,y:y,angle:angle,id:data.id});
        break;
      default:
        break;
    }
  });

  ws.on('close', function(){ws.terminate()});
  ws.on('error', (e) => console.log(e));
});

wss.on('error', (e)=>console.log(e));
//console.log(y.gameStart()); 

//import * as gameLobbyCommands from './commands/gameLobbyCommands.js';

/*io.on('connection', function(socket){
	console.log('a user connected');
	//console.log(x.gameStart());

	socket.on('disconnect', function(){
		console.log('user disconnected');
	});
});*/

/*Server listening to port 8080*/
server.listen(8080, function(){
	console.log(`listening on ${server.address().port}`);
});