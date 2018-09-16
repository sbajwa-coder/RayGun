class Leg extends Phaser.GameObjects.Container {

	constructor (scene, x, y, type){
		super(scene,x,y);

		//Default right
		let direction = 1;
		if (type==='left'){
			direction = -1;
		}
		// let rightleg = this.add.container(-180,0);
		// let right_thigh = this.add.image(0,0,'key',"parts_right-thigh.png");
		// let right_shin = this.add.image(0,10,'key',"parts_right-shin.png");
		// let right_foot  = this.add.image(0,30,'key',"parts_right-foot.png");

		//-165(right shoulder) - 180
		let right_thigh = scene.add.image(0,0,'key',"parts_right-thigh.png");
		let right_shin = scene.add.image(0,10,'key',"parts_right-shin.png");
		let right_foot  = scene.add.image(0,30,'key',"parts_right-foot.png");

		this.add([right_foot,right_shin,right_thigh]).setAngle(15*direction);
	}
}

export default Leg;



/***
	let rightleg = this.add.container(-180,0);
	let right_thigh = this.add.image(0,0,'key',"parts_right-thigh.png");
	let right_shin = this.add.image(0,10,'key',"parts_right-shin.png");
	let right_foot  = this.add.image(0,30,'key',"parts_right-foot.png");

***/