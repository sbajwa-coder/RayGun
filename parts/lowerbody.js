import leg from './leg.js'

class Lowerbody extends Phaser.GameObjects.Container {

	constructor (scene, x, y){
		super(scene,x,y);

		//let lowerbody = this.add.container(150,20);
		//let leftleg = this.add.container(-120,0);
		//let rightleg = this.add.container(-180,0);

		//left = -120,0
		//right = -180,0

		let leftleg = new leg(scene,60,0,'left');
		let rightleg = new leg(scene,0,0,'right');

		this.add([rightleg, leftleg]);
	}
}

export default Lowerbody;



/***
	let rightleg = this.add.container(-180,0);
	let right_thigh = this.add.image(0,0,'key',"parts_right-thigh.png");
	let right_shin = this.add.image(0,10,'key',"parts_right-shin.png");
	let right_foot  = this.add.image(0,30,'key',"parts_right-foot.png");

***/