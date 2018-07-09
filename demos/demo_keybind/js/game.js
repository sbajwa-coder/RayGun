let gameScene = new Phaser.Scene('game');

let config = {
	type: Phaser.AUTO,
	height: 600,
	width:800,
	scene: gameScene
};

let game = new Phaser.Game(config);

gameScene.init = function(){
	this.playerspeed = 1.5;
}

gameScene.preload = function(){
	this.load.spritesheet('mummy'
		,'assets/metalslug_mummy37x45.png', 
		{ frameWidth: 37, frameHeight: 45});
}

gameScene.create = function(){
	this.player = this.add.sprite(50,400,'mummy');
	this.player.setScale(2,2);

	this.anims.create({
		key: 'idle',
		frames: [{key:'mummy',frame:0}],
		frameRate: 30
	});

	this.anims.create({
		key: 'walk',
		frames: this.anims.generateFrameNumbers('mummy', {
			start:0, end:17}),
		frameRate: 30,
		repeat:-1
	});




	cursor = this.input.keyboard.createCursorKeys();
	this.upButton = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
	this.leftButton = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
	this.downButton = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
	this.rightButton = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);

	this.input.on("pointerdown", (event) =>{
		let mouse = event;
		this.player.x = mouse.x;
	});

	this.input.on("pointermove",(event) =>{
		let mouse = event;
		this.player.y = mouse.y;
	});

}

gameScene.update = function(){
	if (cursor.left.isDown || this.leftButton.isDown){
		this.player.anims.play('walk',true);
		this.player.flipX = true;
		this.player.x -= this.playerspeed;
	}
	else if (cursor.right.isDown || this.rightButton.isDown){
		this.player.anims.play('walk',true);
		this.player.flipX = false;
		this.player.x += this.playerspeed;
	}
	else{
		this.player.anims.play('idle');
	}

	if (cursor.up.isDown || this.upButton.isDown){
		this.player.y -= this.playerspeed;
	}
	if (cursor.down.isDown || this.downButton.isDown){
		this.player.y += this.playerspeed;
	}
}