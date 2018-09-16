import upperbody from './upperbody.js'
import lowerbody from './lowerbody.js'

class Fullbody extends Phaser.GameObjects.Container {

	constructor (scene, x, y){
		super(scene,x,y);
		let config = scene.cache.json.get('partsConfig');

		let head = scene.add.image(config.HEAD.x,
			config.HEAD.y, config.KEY, config.HEAD.sprite);

		let upper = new upperbody(scene, config, config.UPPER_BODY.x,
			config.UPPER_BODY.y);

		let lower = new lowerbody(scene, config.LOWER_BODY.x,
			config.LOWER_BODY.y);

		this.add([lower,upper, head]);
	}
}

export default Fullbody;



/***
	let head = scene.add.image(config.Fullbody.head.x,
		config.Fullbody.head.y,'key','parts_head.png');

	let upper = new upperbody(scene,config.Fullbody.upper.x,
		config.Fullbody.upper.y);

	let lower = new lowerbody(scene,config.Fullbody.lower.x,
		config.Fullbody.lower.y);
***/