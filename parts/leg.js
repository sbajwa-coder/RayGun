class Leg extends Phaser.GameObjects.Container {

	constructor (scene, config, type){
		super(scene, config[type+"_LEG"].x, config[type+"_LEG"].y);

		let right_thigh = scene.add.image(config[type+"_THIGH"].x, 
			config[type+"_THIGH"].y, config.KEY, config[type+"_THIGH"].sprite);

		let right_shin = scene.add.image(config[type+"_SHIN"].x, 
			config[type+"_SHIN"].y, config.KEY, config[type+"_SHIN"].sprite);

		let right_foot  = scene.add.image(config[type+"_FOOT"].x, 
			config[type+"_FOOT"].y, config.KEY, config[type+"_FOOT"].sprite);

		this.add([right_foot,right_shin,right_thigh]).setAngle(config[type+"_LEG"].angle);
	}
}

export default Leg;
