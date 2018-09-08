class gameScene extends Phaser.Scene{
	constructor(test){
		super({
			key: 'GameScene'
		});
	}

	preload(){
		this.load.image('key', '../spritesheet.png', '../spritesheet.json');
	}

	create(){
		let warrior = this.add.container(400,400);
		this.add.image(0,0,'key');
	}
}

export default gameScene;
