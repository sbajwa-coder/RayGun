var config = {
	type:Phaser.HEADLESS,
	width:800,
	height:600,
	parent: 'shockfort-game',
	transparent: true,
	physics: {
		default: 'matter',
		matter: {
			gravity: {y : 0, x: 0},
			debug: true
		}
	},
	scene: [Title, Lobby]
};

var game = new Phaser.Game(config);