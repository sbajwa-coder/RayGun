class Lowerarm extends Phaser.GameObjects.Container {

	constructor (scene, config, type){
		super(scene, config[type+"_LOWERARM"].x, config[type+"_LOWERARM"].y);

		let right_forearm  = scene.add.image(config[type+"_FOREARM"].x, 
			config[type+"_FOREARM"].y, config.KEY, config[type+"_FOREARM"].sprite);
		right_forearm.setOrigin(0.5,0);

		let right_hand     = scene.add.image(config[type+"_HAND"].x, 
			config[type+"_HAND"].y, config.KEY, config[type+"_HAND"].sprite)
		right_hand.setOrigin(0.5,0);

		let right_weapon     = scene.add.image(config[type+"_WEAPON"].x, 
			config[type+"_WEAPON"].y, config.KEY, config[type+"_WEAPON"].sprite)
		right_weapon.setAngle(config[type+"_WEAPON"].angle);

		this.add([right_weapon,right_hand,right_forearm]);

		/*Needed to bring the shield to the top*/
		if(config[type+"_WEAPON"].bringToTop){
			this.bringToTop(right_weapon);
		}
	}
}

export default Lowerarm;