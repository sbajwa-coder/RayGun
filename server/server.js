/*Required modules*/
var express = require('express');
var app = express();
var server = require('http').Server(app);
var websocket = require('ws');
var path = require('path');

/*Express setup*/
app.use(express.static(path.resolve('./dist')));
/*app.get('/',function(req,res){
	res.sendFile(path.resolve('./client/src/index.html'));
});*/

console.log(path.resolve('~'));
console.log(path.resolve('/'));
/*Websocket setup*/
const wss = new websocket.Server({server});
import socketServer from './serverWebsocket.js';

/*Broadcase function*/
wss.broadcast = function (data){
	data = JSON.stringify(data);
	wss.clients.forEach(function (client){
		client.send(data);
	});
}

/*Websocket messages*/
wss.on('connection', function(ws) {	
  socketServer(ws);
});
wss.on('error', (e)=>console.log(e));

/*Server listening to port 8080*/
server.listen(8080, function(){
	console.log(`listening on ${server.address().port}`);
});