import upperarm from './upperarm.js'

class Upperbody extends Phaser.GameObjects.Container {

	constructor (scene, config){
		super(scene, config.UPPER_BODY.x, config.UPPER_BODY.y);

		let torso = scene.add.image(config.TORSO.x,
			config.TORSO.y, config.KEY, config.TORSO.sprite);
		
		let rightarm = new upperarm(scene, config.RIGHT_ARM.x, 
			config.RIGHT_ARM.y, 'right');

		let leftarm = new upperarm(scene, config.LEFT_ARM.x,
			config.LEFT_ARM.y, 'left');

		this.add([torso,rightarm,leftarm]);
	}
}

export default Upperbody;
