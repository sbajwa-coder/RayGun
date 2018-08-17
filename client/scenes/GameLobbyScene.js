class GameLobbyScene extends Phaser.Scene{
	constructor(){
		super({
			key: 'gameLobbyScene'
		});
	}

	preload(){
		/*load the character spritesheet*/
		this.load.atlas('warrior', '/assets/sprites/characters/warrior/cur/run/spritesheet.png',
			'/assets/sprites/characters/warrior/cur/run/spritesheet.json');
	}

	create(){
		/*Connect to the websocket server*/
		this.ws = new WebSocket('ws://localhost:8080');

		/*store information about the game*/
		this.id = 0;
		this.players = this.add.group();
		var self = this;

		this.temp;
		/********************************************** WEBSOCKET FUNCTIONS **********************************************/
		this.ws.onopen = function(){
			/*send user information to server*/ 
			var randomName = "J"+Math.floor(Math.random()*700)+50; //temp name creation
	    	self.ws.send(JSON.stringify({username:randomName, type:"join", gameID: 1})); //fixed information sent to server
	    }

	    this.ws.onmessage = function(event){
	    	let data = JSON.parse(event.data);

	    	switch (data.type) {
	    		/*Updates user's game whenever a new player joins the game*/
	    		case 'update':
	    			self.addPlayers(data.player);
	    			break;

	    		/*Initalizes the user's game when the user first joins the game*/
	    		case 'join':
	    			/*Get the users ID. Use this ID when making requests*/
	    			self.id = data.playerID;
	 				
	 				/*Loop through all players from the serverand add them to user's game*/
	 				for (var playerID in data.players){
	 					self.addPlayers(data.players[playerID]);
	 				}
	    			break;

	    		/*Removes player from the game when the player leaves*/
	    		case 'remove':
	    			/*Loop through players in the user's game to find the player to remove*/
	    			self.players.getChildren().forEach(function(player){

	    				/*fix issues id in player.playerId is a string*/
						if (data.playerID == player.id){
			                self.matter.world.remove(player);
			                self.players.remove(player);
			                player.destroy();
			            }
			        });
			        break;

			    case 'move':
	    			self.players.getChildren().forEach(function(player){
	    				//fix issues id in player.playerId is a string
	    				//maybe make this faster by breaking?
						if (data.playerID == player.id){
			                 self.movement(player, data);
			            }
			        });
	    			break;

	    		default:
	    			break;
	    	}
	    }

	    /*********************************************** WINDOWS FUNCTIONS ***********************************************/
	    /*Send a message to server when restarting or leaving the page*/
	    window.onbeforeunload = function(){
	    	self.ws.send(JSON.stringify({type:"leave", playerID: self.id, gameID: 1}));
	    	console.log('nbefore');
	    }

	    /*Close websocket connection when restarting or leaving the page*/
	    window.onunload = function () { 
	    	console.log('nafter');
	    	self.ws.close();
   		}

   		window.onload = function(){
   			console.log('nload');
   		}

   		window.onfocus = function(){
   			//console.log('focused');
   		}

   		// window.onpagehide = function(){
   		// 	console.log('hidden');
   		// }
   		document.addEventListener("visibilitychange", function(){
   			if (document.hidden){console.log('hide');}
   			else{console.log('not hide');}
   		});

   		/*********************************************** PHASER FUNCTIONS ************************************************/
	    this.arrows = this.input.keyboard.createCursorKeys();	
	}		

	update(){
		if (this.arrows.left.isDown){
			this.ws.send(JSON.stringify({type:'move',action:'ArrowLeft',playerID:this.id, gameID:1}));
		}
		else if (this.arrows.right.isDown){
			this.ws.send(JSON.stringify({type:'move',action:'ArrowRight',playerID:this.id, gameID:1}));
		}
		if (this.arrows.up.isDown){
			this.ws.send(JSON.stringify({type:'move',action:'ArrowUp', playerID:this.id, gameID:1}));
		}
		else if (this.arrows.down.isDown){
			this.ws.send(JSON.stringify({type:'move',action:'ArrowDown', playerID:this.id, gameID:1}));
		}
	}

	addPlayers(player){
		//add beggining angle here
		//maybe use the player object better here or reduce the amount of information
		let newPlayer = this.matter.add.sprite(player.character.x, player.character.y, 
			player.character.model, player.character.startImage, /*{angle:player.character.angle, rotation:player.character.rotation}*/); //fixed atm
		newPlayer.angle = player.character.angle;
		newPlayer.rotation = player.character.rotation;

		/*beware of id name inconsistency*/
	    newPlayer.username = player.username;
	    newPlayer.id = player.inGameID; 

	    this.players.add(newPlayer);
	}

	movement(player, data){
		//console.log(Date.now());
		let opposite = Math.sin(player.rotation) * 3; 
		let adjacent = Math.cos(player.rotation) * 3;
	
		// if (data.action === 'ArrowLeft'){
		// 	player.angle-=3;
		// }

		switch (data.action) {
			case 'ArrowLeft':
				player.angle-=3;
				break;

			case 'ArrowRight':
				player.angle+=3;
				break;

			case 'ArrowUp':
				player.x -= opposite;
				player.y += adjacent;
				break;

			case 'ArrowDown':
				player.x += opposite * 0.5; //0.5 to decrease the speed
				player.y -= adjacent * 0.5;
				break;

			default:
				break;
		}
		this.ws.send(JSON.stringify({type:'umove', x:player.x,y:player.y,angle:player.angle, playerID:player.id,gameID: 1,rotation:player.rotation}));

		// player.setPosition(x,y);
		// player.setAngle(angle);
	}
}