import client from '../utils/clientWebsocket.js';
import sceneFunction from '../utils/scene-function/gameLobbyFunction.js'
import characterAnims from '../utils/animation/characterAnims.js'
import keybindings from '../game-objects/player/keybindings.js'

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
		this.load.json('warrior_body','assets/sprites/characters/warrior/cur/run/warrior_body.json');

		this.load.atlas('warrior_attack', '/assets/sprites/characters/warrior/cur/basic-attack1/spritesheet.png',
			'/assets/sprites/characters/warrior/cur/basic-attack1/spritesheet.json');

		/*Map data*/
		this.load.image('map_template','assets/maps/template/template.png');
		this.load.json('map_template_objects','assets/maps/template/map_template.json');
	}

	create(){
		/*store information about the game*/
		this.joinID = 0;
		this.playerList = {}
		this.playerGroup = this.add.group();
		this.viewedPlayer = 0;
		var self = this;

		/*Does everything for websockets and windows*/
		this.sceneFunction = new sceneFunction(this);
		this.client = client;
		this.client(this.sceneFunction);

		/*Animations*/
		characterAnims(this);

		this.controls = keybindings(this);
	    this.movement = false;
	}		

	update(){
		/*Check if the camera is following a player*/
	    if (this.viewedPlayer<=0){
	    	this.sceneFunction.followPlayer(this.joinID);
	    }

	    /*Movement*/
		if (this.controls.left.isDown){
			client.send({type:'PLAYER_MOVE',action:'ArrowLeft',joinID:this.joinID, gameID:1});
		}
		else if (this.controls.right.isDown){
			client.send({type:'PLAYER_MOVE',action:'ArrowRight',joinID:this.joinID, gameID:1});
		}

		//NOTE: spaming both buttons will cause a jitter
		if (this.controls.attack.isDown){
			client.send({type:'PLAYER_MOVE',action:'Attack', joinID:this.joinID, gameID:1});
		}
		else if (this.controls.up.isDown){
			this.movement = true;
			client.send({type:'PLAYER_MOVE',action:'ArrowUp', joinID:this.joinID, gameID:1});
		}
		else if (this.controls.down.isDown){
			this.movement = true;
			client.send({type:'PLAYER_MOVE',action:'ArrowDown', joinID:this.joinID, gameID:1});
		}
		else if (this.movement){
			client.send({type:'PLAYER_MOVE',action:'Stop', joinID:this.joinID, gameID:1});
			this.movement = false;
		}
	}
}

export default GameLobbyScene;