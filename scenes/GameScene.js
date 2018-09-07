class gameScene extends Phaser.Scene{
	constructor(test){
		super({
			key: 'GameScene'
		});
	}

	preload(){

	}

	create(){
		let warrior = this.add.container()
	}
}

export default gameScene;