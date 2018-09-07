const IDLE_FRAME = 'tile000.png';
const BACKGROUND_DEPTH = -1;

function gameLobbyFunction(lobbyScene){
	let scene = lobbyScene;

	/*Character Related*/
	this.addPlayer = function(player){
		let characterData = scene.cache.json.get(player.character.key+'_BODY');
		
		/*Create the matter object(sprite) for player*/
		let playerSprite = scene.matter.add.sprite(player.x, player.y, 
			player.character.key, IDLE_FRAME,
			{shape:characterData['warrior']/*fixed tile*/});

		playerSprite.angle = player.angle;
		playerSprite.rotation = player.rotation;
		playerSprite.on('animationupdate',this.frameHitboxUpdate,scene);

		/*Create a Player Object for new player*/
		let newPlayer = {
			joinID: player.joinID,
			username: player.username,
			sprite: playerSprite,
			stats: player.character.stats
		}

		/*Add the new player to list and group for tracking purpose*/
	 	scene.playerList[player.joinID] = newPlayer;
	    scene.playerGroup.add(playerSprite);
	}

	this.removePlayer = function(data){
		let player = scene.playerList[data.joinID].sprite;

		/*remove the player from the world*/
		scene.matter.world.remove(player);
		scene.playerGroup.remove(player);
		player.destroy();

		/*remove the player from the collection*/
		delete scene.playerList[data.joinID];
	}

	this.makeMoveRequest = function(action){
		scene.client.send({
			type:'PLAYER_MOVE',
			action:action,
			joinID:scene.joinID, 
			gameID:scene.gameID
		})
	}

	this.movePlayer = function(data){
		let player = scene.playerList[data.joinID].sprite;
		let playerStats = scene.playerList[data.joinID].stats;

		let opposite = Math.sin(player.rotation) * playerStats.movementSpeed; //change to player speed
		let adjacent = Math.cos(player.rotation) * playerStats.movementSpeed;

		switch (data.action) {
			case 'ArrowLeft':
				player.angle-=playerStats.angleSpeed;
				break;

			case 'ArrowRight':
				player.angle+=playerStats.angleSpeed;
				break;

			case 'ArrowUp':
				player.x -= opposite;
				player.y += adjacent;
				player.anims.play('warriorWalk',true);
				break;

			case 'ArrowDown':
				player.x += opposite * playerStats.backwardSpeed; //0.5 to decrease the speed
				player.y -= adjacent * playerStats.backwardSpeed;
				player.anims.play('warriorBackwardsWalk',true);
				break;

			case 'Attack':
				player.anims.play('warriorAttack',true);
				break;

			case 'Stop':
				player.anims.stop();
				player.setFrame(IDLE_FRAME);
				break;

			default:
				break;
		}
		scene.client.send({type:'SERVER_MOVE', x:player.x,y:player.y,angle:player.angle, playerID:data.joinID,gameID: 1,rotation:player.rotation}); //need to update server to do this
	}

	this.frameHitboxUpdate = function(animation, frame){
		//NOT IMPLEMENTED
		/*let characterData = scene.cache.json.get(player.character.model+'_body');
		currFrame = frame.textureFrame.split('.')[0];
		this.player.setBody(box[currFrame]);*/
	}

	/*World Related*/
	this.createWorld = function(data){
		scene.joinID = data.joinID;
		scene.gameID = data.gameID;

		/*Loop through all players from the serverand add them to user's game*/
		for (let otherPlayerID in data.players){
			this.addPlayer(data.players[otherPlayerID]);
		}

		/*Make the map*/
		let mapData = scene.cache.json.get(data.background+'_objects');

		let bg = scene.matter.add.sprite(0,0,data.background,
			null,{shape:mapData.template}).setStatic(true).setDepth(BACKGROUND_DEPTH);
		bg.setPosition(0 + bg.centerOfMass.x, 0 + bg.centerOfMass.y); //Sets the position to (0,0) 

		scene.cameras.main.setBounds(0,0,bg.width,bg.height);
	    scene.matter.world.setBounds(0,0,bg.width,bg.height);

	    /*Make the terminal*/
	   	let terminal = scene.matter.add.sprite(500,500,'CHAR_WARRIOR',IDLE_FRAME).setInteractive({ cursor: 'pointer' });

	    terminal.on('pointerdown', function(pointer){
	    	//alert($(document));
	    	scene.scene.launch('testScene',{client:scene.client, players:scene.playerList});
		});
	}

	this.disconnect = function(){
		console.log(scene.gameID);
		/**Do a check on the server side to see if gameID exists**/
		return {type:"WORLD_DISCONNECT", joinID:scene.joinID, gameID: 1};
	}


	/*Camera Related*/
	this.followPlayer = function(joinID){
		if (joinID > 0){
			scene.cameras.main.startFollow(scene.playerList[joinID].sprite);
			scene.viewedPlayer = joinID;
		}
	}

	this.followOtherPlayers = function(team=true){
		/**NOT AVIALABLE**/
	}
}


export default gameLobbyFunction;