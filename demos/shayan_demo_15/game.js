var config = {
	type:Phaser.AUTO,
	width:800,
	height:600,
	//backgroundColor:'#ffffff',
	transparent:true,
	physics: {
		default: 'matter',
		matter: {
			gravity: {y : 0, x: 0},
			debug: true
		}
	},
	scene: [Example]
};

var game = new Phaser.Game(config);