function gameLobbyFunction(lobbyScene){
	let scene = lobbyScene;

	this.addPlayer = function(player){
		/*Create the matter object(sprite) for player*/
		let playerSprite = scene.matter.add.sprite(player.character.x, player.character.y, 
			player.character.model, player.character.startImage);

		playerSprite.angle = player.character.angle;
		playerSprite.rotation = player.character.rotation;

		/*Create a Player Object for new player*/
		let newPlayer = {
			joinID: player.joinID,
			username: player.username,
			sprite: playerSprite
			//need to add stats
		}

		/*Add the new player to list and group for tracking purpose*/
	 	scene.playerList[player.joinID] = newPlayer;
	    scene.playerGroup.add();
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

	this.movePlayer = function(data){
		let player = scene.playerList[data.joinID].sprite;

		let opposite = Math.sin(player.rotation) * 3; //change to player speed
		let adjacent = Math.cos(player.rotation) * 3;

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
		scene.client.send({type:'umove', x:player.x,y:player.y,angle:player.angle, playerID:data.joinID,gameID: 1,rotation:player.rotation}); //need to update server to do this
	}

	this.createWorld = function(data){
		scene.joinID = data.joinID;

		/*Loop through all players from the serverand add them to user's game*/
		for (let otherPlayerID in data.players){
			this.addPlayer(data.players[otherPlayerID]);
		}
	}

	this.disconnect = function(){
		return {type:"leave", joinID:scene.joinID, gameID: 1};
	}
}


export default gameLobbyFunction;