import lowerarm from './lowerarm.js'

class Upperarm extends Phaser.GameObjects.Container {

	constructor (scene, config, type){

		super(scene,config[type+"_ARM"].x, config[type+"_ARM"].y);

		let right_shoulder = scene.add.image(config[type+"_SHOULDER"].x, 
			config[type+"_SHOULDER"].y, config.KEY, config[type+"_SHOULDER"].sprite);
		right_shoulder.setOrigin(0.5,0.5);

		let right_upperarm = scene.add.image(config[type+"_BISCEP"].x, 
			config[type+"_BISCEP"].y, config.KEY, config[type+"_BISCEP"].sprite)
		right_upperarm.setOrigin(1,0).setAngle(config[type+"_BISCEP"].angle);
		
		let arm = new lowerarm(scene, config, type);

		this.add([arm,right_upperarm,right_shoulder]);
	}
}

export default Upperarm;