class Lowerarm extends Phaser.GameObjects.Container {

	constructor (scene, x, y,type){
		super(scene,x,y);
		//Default right
		let direction = 1;
		if (type==='left'){
			direction = -1;
		}

		// let right_forearm  = scene.add.image(-13,40,'key',"parts_right-forearm.png").setOrigin(0.5,0.5);
		// let right_hand     = scene.add.image(-10,50,'key',"parts_right-hand.png").setOrigin(0.5,0);

		// let right_forearm  = scene.add.image(15,20,'key',"parts_right-forearm.png").setOrigin(0.5,0.5);
		// let right_hand     = scene.add.image(18,30,'key',"parts_right-hand.png").setOrigin(0.5,0);

		let right_forearm  = scene.add.image(0,0,'key',"parts_right-forearm.png").setOrigin(0.5,0);
		let right_hand     = scene.add.image(3,30,'key',"parts_right-hand.png").setOrigin(0.5,0);

		//forearm 0,0
		//hand 3,10
		if (direction === -1){
			right_forearm.flipX = true;
			right_hand.flipX = true;

			right_forearm.x = 18;
			right_hand.x = 15;

		}

		this.add([right_hand,right_forearm]);
	}
}

export default Lowerarm;


/***
	let right_forearm  = this.add.image(-13,40,'key',"parts_right-forearm.png").setOrigin(0.5,0.5);
	let right_hand     = this.add.image(-10,50,'key',"parts_right-hand.png").setOrigin(0.5,0);
	let sword 		   = this.add.image(10,112,'key',"parts_sword.png").setAngle(-20);
***/