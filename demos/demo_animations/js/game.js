//New scene with name "game"
let gameScene = new Phaser.Scene('game');

//Game config
let config = {
	type: Phaser.AUTO, //phaser decides whether to use WebGL or Canvas depending on user
	width: 800,
	height: 600,
	scene: gameScene //scenes for the game
};

let game = new Phaser.Game(config);

//Scene life cycle
//Init -> Preload -> Create -> Update [other cycles: render, shutdown, destroy]

gameScene.preload = function(){
	this.load.image('background', 'assets/background.png');
	//this.load.multiatlas('guy','assets/walking.json','assets'); <- loading atlas
	this.load.spritesheet('mummy'
		,'assets/metalslug_mummy37x45.png', 
		{ frameWidth: 37, frameHeight: 45});
}

gameScene.create = function(){
	//background
	let bg = this.add.sprite(0,0,'background');	
	bg.setOrigin(0,0);

	player = this.add.sprite(50,400,'mummy');
	player.setScale(2,2);
	this.anims.create({
		key: 'walk',
		frames: this.anims.generateFrameNumbers('mummy', {
			start:0, end:17}),
		frameRate: 30,
		repeat:-1
	});

	player.anims.play('walk');
}

/* Atlas
	//player
	//this.guy = this.add.sprite(50,400,'guy','capguy/walk/0001.png');
	//this.guy.setSale(0.5,0.5);

	var frameName = this.anims.generateFrameNames('guy',{
		start: 1, end: 8, zeroPad: 4,
		prefix: 'walk/', suffix:'.png'
	});

	this.anims.create({key:'walk', frame:frameName, frameRate:10, repeat:-1});
	this.guy.anims.play('walk');*/

/* Non Animation
gameScene.preload = function(){
	this.load.image('background', 'assets/background.png');
	this.load.image('guy','assets/capguy/walk/0001.png');
}

gameScene.create = function(){
	//background
	let bg = this.add.sprite(0,0,'background');	
	bg.setOrigin(0,0);

	//player
	this.guy = this.add.sprite(50,400,'guy');
	this.guy.setSale(0.5);
}*/