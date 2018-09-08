let gameScene = new Phaser.Scene('game');

let config = {
	type: Phaser.AUTO,
	width: 800,
	height: 600,
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

let game = new Phaser.Game(config);

gameScene.preload = function(){
	this.load.atlas('key', './spritesheet.png', './spritesheet.json');
}

gameScene.create = function(){
	let warrior = this.add.container(300,300);
	let right_shoulder = this.add.image(0,0,'key',"parts_right-shoulder.png").setDepth(2);//.setScale(5);
	let right_upperarm = this.add.image(2,5,'key',"parts_right-upperarm.png").setOrigin(1,0).setDepth(1);//.setAngle(45);//.setScale(5);
	let right_forearm  = this.add.image(-3,18,'key',"parts_right-forearm.png").setOrigin(0.5,0.5).setDepth(0);//.setScale(5);
	let right_hand     = this.add.image(-5,20,'key',"parts_right-hand.png").setOrigin(0,0).setDepth(-1);//.setScale(5);

	warrior.add([right_shoulder,right_upperarm,right_forearm,right_hand]);
	//warrior.addAt([right_forearm,right_hand],10);
}