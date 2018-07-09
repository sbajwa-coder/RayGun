let gameScene = new Phaser.Scene('game');

let config = {
	type: Phaser.AUTO,
	width: 600,
	height: 800 ,
	scene: gameScene
};

let game = new Phaser.Game(config);

gameScene.preload = function(){
	this.load.image('background', 'assets/background.png');
	this.load.json('map', 'layout/lay1.json');

	this.load.image('tile0','assets/tile0.png');
	this.load.image('grass','assets/grass.png');
}

gameScene.create = function(){
	//background

	//Get level data from json
	this.level = this.cache.json.get('map');
	
	//Set the background from json
	let bg = this.add.image(0,0,this.level.background);
	bg.setOrigin(0,0);

	//Set spirite from json
	for (var i in this.level.sprite){
		i = this.level.sprite[i];
		this.add.sprite(i.x,i.y,i.image);
	}
}