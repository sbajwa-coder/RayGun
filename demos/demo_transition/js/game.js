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
	this.load.image('warrior'
		,'assets/warrior.png');
}

gameScene.create = function(){
	this.player = this.add.sprite(150,400,'warrior');
	this.player.setScale(2,2);
	// this.player.anchor = 0.5;

	this.input.on("pointermove",(event) =>{
		let mouse = event;
		//physics.arcade.angleToPointer(this.object)????
		this.player.rotation =
			Math.atan2(mouse.y-this.player.y, 
				mouse.x-this.player.x) - 90;
	});

}