var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io').listen(server);

var players = {};

app.use(express.static(__dirname+'/public'));

app.get('/',function(req,res){
	res.sendFile(__dirname+'/index.html');
});

io.on('connection', function(socket){
	console.log('a user connected');

	players[socket.id] = {
		angle: 0,
		x: Math.floor(Math.random()*700)+50,
		y: Math.floor(Math.random()*500)+50,
		playerId: socket.id,
		team: (Math.floor(Math.random()*2)==0)? 'red':'blue'
	};

	socket.emit('currentPlayers', players);
	socket.broadcast.emit('newPlayer',players[socket.id]);

	socket.on('disconnect', function(){
		console.log('user disconnected');

		delete players[socket.id];
		io.emit('disconnect', socket.id);
	});

	socket.on('playerMovement',function(moveData){
		/*players[socket.id].x = moveData.x;
		players[socket.id].y = moveData.y;
		players[socket.id].angle = moveData.angle;*/

		socket.broadcast.emit('playerMoved', {'id':socket.id,'direction':moveData});
	});


	socket.on('playerStopped',function(){
		socket.broadcast.emit('playerStopped', players[socket.id]);
	})
});

server.listen(8081, function(){
	console.log(`listening on ${server.address().port}`);
});