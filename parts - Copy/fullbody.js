import upperbody from './upperbody.js'
import lowerbody from './lowerbody.js'

class Fullbody extends Phaser.GameObjects.Container {

	constructor (scene, x, y){
		super(scene,x,y);

		// let head = this.add.image(0,0,'key','parts_head.png');
		//torso = 65,7
		//let upperbody = this.add.container(0,10);
		//upperbody = 0,10
		//let lowerbody = this.add.container(150,20);
		//lowerbody = 150,20


		let head = scene.add.image(80,0,'key','parts_head.png');
		let upbody = new upperbody(scene,0,25);
		let lowbody = new lowerbody(scene,50,55);

		this.add([lowbody,upbody, head]);
	}
}

export default Fullbody;



/***
	let head = this.add.image(0,0,'key','parts_head.png');

		let rightleg = this.add.container(15,0);
***/