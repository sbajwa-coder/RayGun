class TestScene extends Phaser.Scene{
	constructor(test){
		super({
			key: 'testScene'
		});
	}

	preload(){
		this.load.image('testimg', '/assets/test.jpg')
	}

	create(){
		let x = this.add.image(0,0,'testimg').setOrigin(0,0).setScale(0.1,0.1).setInteractive({ cursor: 'pointer' });
		x.on('pointerdown', function(){
			this.scene.scene.remove()
		});

		console.log('active')
	}
}

export default TestScene;