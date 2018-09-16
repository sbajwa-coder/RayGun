import upperarm from './upperarm.js'

class Upperbody extends Phaser.GameObjects.Container {

	constructor (scene, x, y){
		super(scene,x,y);

		// let torso = this.add.image(0,0,'key',"parts_torso.png");
		//torso = 65,7

		//let leftarm = this.add.container(70, -7);
		// left = 70, -7

		//let rightarm = this.add.container(-65,-7);
		//right = -65,-7

		//+13 for upperbody
		//65+70 = 135 for left
		let torso = scene.add.image(78,7,'key',"parts_torso.png");
		let rightarm = new upperarm(scene,0,0, 'right');
		let leftarm = new upperarm(scene,135,0, 'left');

		this.add([torso,rightarm,leftarm]);
	}
}

export default Upperbody;



/***
	let torso = this.add.image(0,0,'key',"parts_torso.png");


	let rightarm = this.add.container(-65,-7);
	let leftarm = this.add.container(70, -7);
***/