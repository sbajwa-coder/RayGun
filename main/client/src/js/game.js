// import 'phaser';
// import BootScene from './scenes/BootScene';
let gameScene = new Phaser.Scene('game');
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
	scene: gameScene
};

const game = new Phaser.Game(config);

function preload(){
	console.log("HI");
}