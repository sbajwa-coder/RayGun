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
		console.log("newPlayer")
		addOtherPlayers(self, playerInfo);
	});

	this.socket.on('disconnect', function(playerId){
		self.otherPlayers.getChildren().forEach(function(otherPlayer){
			if (playerId === otherPlayer.playerId){
                self.matter.world.remove(otherPlayer);
                self.otherPlayers.remove(otherPlayer);
                otherPlayer.destroy();


			}
		});
	});

	this.socket.on('playerMoved', function(playerInfo){
		self.otherPlayers.getChildren().forEach(function(otherPlayer){
			let opposite = Math.sin(otherPlayer.rotation) * self.player.speed;	
		let adjacent = Math.cos(otherPlayer.rotation) * self.player.speed;

			if (playerInfo.direction === 'left'){
				otherPlayer.angle -= 3;
			}

			else if (playerInfo.direction === 'right'){
				otherPlayer.angle += 3;
			}

			if (playerInfo.direction === 'up'){
				otherPlayer.x -= opposite;
				otherPlayer.y += adjacent;
			}
			if (playerInfo.direction === 'down'){
				otherPlayer.x += opposite*0.5;
				otherPlayer.y -= adjacent*0.5;
			}
			otherPlayer.play(self.player.run.key,true);
				/*otherPlayer.setPosition(playerInfo.x,playerInfo.y);
				otherPlayer.setAngle(playerInfo.angle);
				otherPlayer.play(self.player.run.key,true);*/
		});
	});


	this.socket.on('playerStopped', function(playerInfo){
		self.otherPlayers.getChildren().forEach(function(otherPlayer){
			otherPlayer.anims.stop();
			otherPlayer.setFrame('tile000.png');
		});
	});

	this.arrowKeys = this.input.keyboard.createCursorKeys()

}

function update(){

	if (this.player){
		this.moving = false;
		let opposite = Math.sin(this.player.rotation) * this.player.speed;	
		let adjacent = Math.cos(this.player.rotation) * this.player.speed;

		if (this.arrowKeys.left.isDown){
			this.moving = true;
			this.player.angle -= 3;
			this.socket.emit('playerMovement', "left");
		}

		else if (this.arrowKeys.right.isDown){
			this.moving = true;
			this.player.angle += 3;
			this.socket.emit('playerMovement', "right");
		}

		if (this.arrowKeys.up.isDown){
			this.moving = true;
			this.player.x -= opposite;
			this.player.y += adjacent;
			this.socket.emit('playerMovement', "up");
		}
		if (this.arrowKeys.down.isDown){
			this.moving = true;
			this.player.x += opposite*0.5;
			this.player.y -= adjacent*0.5;
			this.socket.emit('playerMovement', "down");
		}

		if (this.moving) {
			this.player.play(this.player.run.key, true);
			
		} else {
			this.player.anims.stop();
			this.player.setFrame('tile000.png');
			this.socket.emit('playerStopped');
		}

/*
		var x = this.player.x;
		var y = this.player.y;
		var angle = this.player.angle;

		if (this.player.oldPos && 
			(x!==this.player.oldPos.x || y!==this.player.oldPos.y || angle!==this.player.oldPos.angle)){
			this.socket.emit('playerMovement', {x,y,angle});
		}


		this.player.oldPos = {
			x: this.player.x,
			y: this.player.y,
			angle: this.player.angle
		};*/
	}
}

function addPlayers(self, playerInfo){
	self.player = self.matter.add.sprite(playerInfo.x, playerInfo.y,'warriorRun','tile000.png');
	self.player.speed = 3;

	if (playerInfo.team === 'red'){
		self.player.setTint(0xff0000);
	}

	let warriorRunFrame = self.anims.generateFrameNames('warriorRun',{start:0, end:15, 
		zeroPad:3, prefix: 'tile', suffix:'.png'});

	self.player.run = self.anims.create({key: 'run', frames: warriorRunFrame, frameRate: 30, repeat: -1});
}

function addOtherPlayers(self, playerInfo){
	const otherPlayer =  self.matter.add.sprite(playerInfo.x, playerInfo.y,'warriorRun','tile000.png');

	let warriorRunFrame = self.anims.generateFrameNames('warriorRun',{start:0, end:15, 
		zeroPad:3, prefix: 'tile', suffix:'.png'});

	if (playerInfo.team === 'red'){
		otherPlayer.setTint(0xff0000);
	}
	//otherPlayer.run = self.anims.create({key: 'run'+otherPlayer.playerId, frames: warriorRunFrame, frameRate: 30, repeat: -1});

	otherPlayer.playerId = playerInfo.playerId;
	self.otherPlayers.add(otherPlayer);
}