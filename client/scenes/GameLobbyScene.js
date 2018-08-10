class GameLobbyScene extends Phaser.Scene{
	constructor(){
		super({
			key: 'gameLobbyScene'
		});
	}

	preload(){
		this.load.atlas('warrior', '/assets/sprites/characters/warrior/cur/run/spritesheet.png',
			'/assets/sprites/characters/warrior/cur/run/spritesheet.json');
	}

	create(){
		this.ws = new WebSocket('ws://localhost:8080');
		this.id = 0;
		this.players = this.add.group();
		var self = this;


		this.ws.onopen = function(){
			/*send user information to server*/
	    	self.ws.send(JSON.stringify({username:"J", type:"join"}));
	    }

	    this.ws.onmessage = function(ev){
	    	var data = JSON.parse(ev.data);

	    	switch (data.type) {
	    		case 'update':
	    			console.log('newguy');
	    			var newPlayer = self.matter.add.sprite(data.player.x, data.player.y, 'warrior', 
	    				'tile000.png');
	    			newPlayer.username = data.player.username;
	    			newPlayer.playerId = data.player.id;
	    			self.players.add(newPlayer);
	    			break;
	    		case 'join':
	    			self.id = data.id;
	 				console.log(data.players);
	    			Object.keys(data.players).forEach(function(id) {
	    				var newPlayer = self.matter.add.sprite(data.players[id].x, data.players[id].y, 'warrior', 
	    				'tile000.png');

	    				newPlayer.playerId = id;
	    				newPlayer.username = data.players[id].username;

	    				self.players.add(newPlayer);
	    			});
	    			break;

	    		case 'remove':
	    			console.log(data.id);
	    			console.log(self.players);
	    			self.players.getChildren().forEach(function(player){
	    				console.log(data.id, player.playerId);
	    				/*fix issues id in player.playerId is a string*/
						if (data.id == player.playerId){
			                self.matter.world.remove(player);
			                self.players.remove(player);
			                player.destroy();
			            }
			        });
			        break;
			    case 'move':
	    
	    			self.players.getChildren().forEach(function(player){
	    				console.log(player);
						if (data.id == player.playerId){
			                player.setPosition(data.x,data.y);
			                player.setAngle(data.angle);
			            }
			        });
	    			break;
	    		default:
	    			// statements_def
	    			break;
	    	}
	    }

	    this.arrows = this.input.keyboard.createCursorKeys();

	    window.onbeforeunload = function(){
	    	self.ws.send(JSON.stringify({type:"leave", id: self.id}));
	    }
	    window.onunload = function () { 
	    	self.ws.close();
   		}
	}		

	update(){
		if (this.arrows.left.isDown){
			this.ws.send(JSON.stringify({type:'move',action:'left',rotation:1, id:this.id}));
		}
		else if (this.arrows.right.isDown){
			this.ws.send(JSON.stringify({type:'move',action:'right',rotation:1, id:this.id}));
		}
		if (this.arrows.up.isDown){
			this.ws.send(JSON.stringify({type:'move',action:'up',rotation:1, id:this.id}));
		}
		else if (this.arrows.down.isDown){
			this.ws.send(JSON.stringify({type:'move',action:'down',rotation:1, id:this.id}));
		}
	}
}