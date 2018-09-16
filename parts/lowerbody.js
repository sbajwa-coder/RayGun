import leg from './leg.js'

class Lowerbody extends Phaser.GameObjects.Container {

	constructor (scene, config){
		super(scene, config.LOWER_BODY.x, config.LOWER_BODY.y);

		let leftleg = new leg(scene, config,'LEFT');
		let rightleg = new leg(scene, config,'RIGHT');

		this.add([rightleg, leftleg]);
	}
}

export default Lowerbody;