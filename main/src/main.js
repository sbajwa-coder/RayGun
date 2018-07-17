import 'phaser';
import BootScene from './scenes/BootScene';

const config = {
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
	scene:[
		BootScene,
	]	
};

const game = new Phaser.Game(config);