//import Phaser from 'phaser';
// import BootScene from './scenes/BootScene';
import GameLobbyScene from './scenes/GameLobbyScene';
import testScene from './scenes/testScene';

var config = {
	type: Phaser.AUTO,
	height:600,
	width:800,
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
	},
	scene: [GameLobbyScene,testScene]
};

const game = new Phaser.Game(config);
