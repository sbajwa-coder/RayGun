import client from '../utils/clientWebsocket.js';
import sceneFunction from '../utils/scene-function/gameLobbyFunction.js';
import characterAnims from '../utils/animation/characterAnims.js';
import keybindings from '../game-objects/player/keybindings.js';

const CHAR_WARRIOR_RUN = '/assets/sprites/characters/warrior/cur/run/';
const CHAR_WARRIOR_ATTACK = '/assets/sprites/characters/warrior/cur/basic-attack1/';

class GameLobbyScene extends Phaser.Scene{
	constructor(){
		super({
			key: 'GameLobbyScene'
		});
	}

	preload(){
		/*load the character spritesheet*/
		this.load.atlas('CHAR_WARRIOR', CHAR_WARRIOR_RUN+'spritesheet.png', CHAR_WARRIOR_RUN+'spritesheet.json');
		this.load.atlas('warrior', CHAR_WARRIOR_RUN+'spritesheet.png', CHAR_WARRIOR_RUN+'spritesheet.json');
		this.load.json('CHAR_WARRIOR_BODY',CHAR_WARRIOR_RUN+'warrior_body.json');

		this.load.atlas('warrior_attack', CHAR_WARRIOR_ATTACK+'spritesheet.png', CHAR_WARRIOR_ATTACK+'spritesheet.json');

		/*Map data*/
		this.load.image('map_template','assets/maps/template/template.png');
		this.load.json('map_template_objects','assets/maps/template/map_template.json');
	}

	create(){
		/*store information about the game*/
		this.joinID = 0;
		this.gameID = 0;
		this.playerList = {}
		this.playerGroup = this.add.group();
		this.viewedPlayer = 0;

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
	    if ( /*this.playerList &&*/ this.viewedPlayer<=0){
	    	this.sceneFunction.followPlayer(this.joinID);
	    }

	    /*Movement*/
		if (this.controls.left.isDown){
			this.sceneFunction.makeMoveRequest('ArrowLeft');
		}
		else if (this.controls.right.isDown){
			this.sceneFunction.makeMoveRequest('ArrowRight');
		}

		//NOTE: spaming both buttons will cause a jitter
		if (this.controls.attack.isDown){
			this.sceneFunction.makeMoveRequest('Attack');
		}
		else if (this.controls.up.isDown){
			this.movement = true;
			this.sceneFunction.makeMoveRequest('ArrowUp');
		}
		else if (this.controls.down.isDown){
			this.movement = true;
			this.sceneFunction.makeMoveRequest('ArrowDown');
		}
		else if (this.movement){
			this.sceneFunction.makeMoveRequest('Stop');
			this.movement = false;
		}
	}
}

export default GameLobbyScene;