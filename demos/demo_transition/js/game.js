let gameScene = new Phaser.Scene('game');

let config = {
	type: Phaser.AUTO,
	height: 600,
	width:800,
	scene: gameScene
};

let game = new Phaser.Game(config);

gameScene.init = function(){
	this.playerspeed = 5;
}

gameScene.preload = function(){
	this.load.image('warrior'
		,'assets/warrior.png');
}

gameScene.create = function(){
	this.player = this.add.sprite(150,400,'warrior');
	this.player.setScale(2,2);
	//this.player.setOrigin(0.5,0.5);
	// this.player.anchor = 0.5;

	this.input.on("pointermove",(event) =>{
		let mouse = event;
		//physics.arcade.angleToPointer(this.object)????
		this.player.rotation =
			Math.atan2(mouse.y-this.player.y, 
				mouse.x-this.player.x) - (90*(Math.PI/180));
		/* METHOD 2
		let angle = Phaser.Math.Angle.Between(
			this.player.x, this.player.y,
			mouse.x + this.cameras.main.scrollX, 
			mouse.y + this.cameras.main.scrollY) - 90;

		this.player.rotation =angle;*/
	});

	cursor = this.input.keyboard.createCursorKeys();
	this.upButton = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
	this.leftButton = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
	this.downButton = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
	this.rightButton = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);

}

gameScene.update = function(){
	if (cursor.left.isDown || this.leftButton.isDown){
		this.player.x -= this.playerspeed;
	}
	else if (cursor.right.isDown || this.rightButton.isDown){
		this.player.x += this.playerspeed;
	}

	if (cursor.up.isDown || this.upButton.isDown){
		this.player.y -= this.playerspeed;
	}
	if (cursor.down.isDown || this.downButton.isDown){
		this.player.y += this.playerspeed;
	}
}