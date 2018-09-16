import lowerarm from './lowerarm.js'

class Upperarm extends Phaser.GameObjects.Container {

	constructor (scene, x, y, type){
		super(scene,x,y);

		//Default right
		let direction = 1;
		if (type==='left'){
			direction = -1;
		}

		// let right_shoulder = this.add.image(0,0,'key',"parts_right-shoulder.png");
		// let right_upperarm = this.add.image(10,10,'key',"parts_right-upperarm.png").setOrigin(1,0).setAngle(20);

		let right_shoulder = scene.add.image(13,0,'key',"parts_right-shoulder.png").setOrigin(0.5,0.5);
		let right_upperarm = scene.add.image(23,10,'key',"parts_right-upperarm.png").setOrigin(1,0).setAngle(20*direction);
		//arm -13,41
		let arm = new lowerarm(scene,0,21,type);

		if (direction === -1){
			right_shoulder.flipX = true;
			right_upperarm.y = 5;
		}
		//arm = -13,41
		//shoulder = 0,0
		//upperarm = 10,10

		this.add([arm,right_upperarm,right_shoulder]);
	}
}

export default Upperarm;


/***
	let right_shoulder = this.add.image(0,0,'key',"parts_right-shoulder.png");
	let right_upperarm = this.add.image(10,10,'key',"parts_right-upperarm.png").setOrigin(1,0).setAngle(20);
***/