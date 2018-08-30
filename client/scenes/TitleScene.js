import y from  '../utils/UI/title-page.js';
class TitleScene extends Phaser.Scene{
	constructor(test){
		super({
			key: 'TitleScene'
		});
	}

	preload(){}

	create(){
		this.scene.start('gameLobbyScene');
	}
}

export default TitleScene;