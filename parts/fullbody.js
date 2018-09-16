import upperbody from './upperbody.js'
import lowerbody from './lowerbody.js'

class Fullbody extends Phaser.GameObjects.Container {

	constructor (scene, x, y){
		super(scene,x,y);
		let config = scene.cache.json.get('partsConfig');

		let head = scene.add.image(config.Fullbody.head.x,
			config.Fullbody.head.y,'key','parts_head.png');

		let upper = new upperbody(scene,config.Fullbody.upper.x,
			config.Fullbody.upper.y);

		let lower = new lowerbody(scene,config.Fullbody.lower.x,
			config.Fullbody.lower.y);

		this.add([lower,upper, head]);
	}
}

export default Fullbody;



/***
	let head = this.add.image(0,0,'key','parts_head.png');

		let rightleg = this.add.container(15,0);
***/