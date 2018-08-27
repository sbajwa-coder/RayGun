function gameLobbyFunction(lobbyScene){
	let scene = lobbyScene;

	/*Character Related*/
	this.addPlayer = function(player){
		let characterData = scene.cache.json.get(player.character.model+'_body');

		/*Create the matter object(sprite) for player*/
		let playerSprite = scene.matter.add.sprite(player.character.x, player.character.y, 
			player.character.model, player.character.startImage,
			{shape:characterData[player.character.model]/*fixed tile*/});

		playerSprite.angle = player.character.angle;
		playerSprite.rotation = player.character.rotation;
		playerSprite.on('animationupdate',this.frameHitboxUpdate,scene);

		/*Create a Player Object for new player*/
		let newPlayer = {
			joinID: player.joinID,
			username: player.username,
			sprite: playerSprite
			//need to add stats
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
				player.anims.play('warriorWalk',true);
				break;

			case 'ArrowDown':
				player.x += opposite * 0.5; //0.5 to decrease the speed
				player.y -= adjacent * 0.5;
				player.anims.play('warriorBackwardsWalk',true);
				break;

			case 'Attack':
				player.anims.play('warriorAttack',true);
				break;
				
			case 'Stop':
				player.anims.stop();
				player.setFrame('tile000.png');
				break;

			default:
				break;
		}
		scene.client.send({type:'umove', x:player.x,y:player.y,angle:player.angle, playerID:data.joinID,gameID: 1,rotation:player.rotation}); //need to update server to do this
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

		/*Loop through all players from the serverand add them to user's game*/
		for (let otherPlayerID in data.players){
			this.addPlayer(data.players[otherPlayerID]);
		}

		/*Make the map*/
		let mapData = scene.cache.json.get(data.background+'_objects');
		let bg = scene.add.image(0,0,data.background).setOrigin(0,0).setDepth(-1);
		let obj = scene.matter.add.sprite(0,0,null,null,{shape:mapData.template}).setStatic(true).setOrigin(0,0).setPosition(bg.width/2+25, bg.height/2-60).setScale(4,4).setDepth(-22);
		obj.visible = false;

		scene.cameras.main.setBounds(0,0,bg.width,bg.height);
	    scene.matter.world.setBounds(0,0,bg.width,bg.height);
	}

	this.disconnect = function(){
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