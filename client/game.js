import GameLobbyScene from './scenes/GameLobbyScene';
import LobbyScene from './scenes/LobbyScene';
import TitleScene from './scenes/TitleScene';
import testScene from './scenes/testScene';

var config = {
	type: Phaser.AUTO,
	height:600,
	width:800,
	parent: 'shockfort-game',
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
	scene: [LobbyScene, TitleScene, GameLobbyScene]//,LobbyScene,GameLobbyScene,testScene]
};

const game = new Phaser.Game(config);
