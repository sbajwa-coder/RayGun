let config = {
	type: Phaser.AUTO,
	height: 600,
	width:800,
	scene: {
		preload: preload,
		create: create,
		update: update
		},
	physics: {
		default: 'matter',
		matter: {
			debug:true,
			setBounds: {
				width: 800,
				height: 600
			},
			gravity: {
				y:0
			}
		}
	}
};


let game = new Phaser.Game(config);

function preload(){
	this.load.atlas('warriorRun', 'assets/spritesheet.png', 'assets/spritesheet.json');
}

function create(){
	var self = this;
	this.socket = io();
	this.otherPlayers = this.add.group();

	this.socket.on('currentPlayers', function(players){
		Object.keys(players).forEach(function(id){
			console.log("currPlayer");
			if (players[id].playerId === self.socket.id){
				addPlayers(self, players[id]);
			} else{
				addOtherPlayers(self, players[id]);
			}
		});
	});

	this.socket.on('newPlayer', function(playerInfo){
//		if (playerInfo.playerId !== self.socket.id){
		console.log("newPlayer")
			addOtherPlayers(self, playerInfo);
	//	}
	});

	this.socket.on('disconnect', function(playerId){
		self.otherPlayers.getChildren().forEach(function(otherPlayer){
			if (playerId === otherPlayer.playerId){
				console.log(otherPlayer)
				otherPlayer.destroy();
			}
		});
	});
	//this.player = this.matter.add.sprite(150,150,'warriorRun','tile000.png');

}

function update(){

}

function addPlayers(self, playerInfo){
	this.player = self.matter.add.sprite(playerInfo.x, playerInfo.y,'warriorRun','tile000.png');

	if (playerInfo.team === 'red'){
		this.player.setTint(0xff0000);
	}

	let warriorRunFrame = self.anims.generateFrameNames('warriorRun',{start:0, end:15, 
		zeroPad:3, prefix: 'tile', suffix:'.png'});

	self.anims.create({key: 'run', frames: warriorRunFrame, frameRate: 30, repeat: -1});
}

function addOtherPlayers(self, playerInfo){
	const otherPlayer =  self.matter.add.sprite(playerInfo.x, playerInfo.y,'warriorRun','tile000.png');

	if (playerInfo.team === 'red'){
		otherPlayer.setTint(0xff0000);
	}

	otherPlayer.playerId = playerInfo.playerId;
	self.otherPlayers.add(otherPlayer);
}