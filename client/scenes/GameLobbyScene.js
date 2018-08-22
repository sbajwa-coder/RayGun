import client from '../utils/clientWebsocket.js';
import sceneFunction from '../utils/scene-function/gameLobbyFunction.js'

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
		/*store information about the game*/
		this.joinID = 0;
		this.playerList = {}
		this.playerGroup = this.add.group();
		var self = this;

		/*Does everything for websockets and windows*/
		this.scene = new sceneFunction(this);
		this.client = client;
		this.client(this.scene);

	    this.arrows = this.input.keyboard.createCursorKeys();	
	}		

	update(){
		if (this.arrows.left.isDown){
			client.send({type:'PLAYER_MOVE',action:'ArrowLeft',joinID:this.joinID, gameID:1});
		}
		else if (this.arrows.right.isDown){
			client.send({type:'PLAYER_MOVE',action:'ArrowRight',joinID:this.joinID, gameID:1});
		}
		if (this.arrows.up.isDown){
			client.send({type:'PLAYER_MOVE',action:'ArrowUp', joinID:this.joinID, gameID:1});
		}
		else if (this.arrows.down.isDown){
			client.send({type:'PLAYER_MOVE',action:'ArrowDown', joinID:this.joinID, gameID:1});
		}
	}
}

export default GameLobbyScene;