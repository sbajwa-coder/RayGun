class Example extends Phaser.Scene {
	constructor() {
		super({
			key: "Example"});
	}

	preload() {
		this.load.spritesheet('mummy'
		,'assets/metalslug_mummy37x45.png', 
		{ frameWidth: 37, frameHeight: 45});
	}

	create() {

		this.character = this.add.group();

		//this.matter.add.mouseSpring();
		// Classic mummy spritesheet animation
		this.mum = this.add.sprite(200,200,'mummy');
		this.mum.setAngle(90);
		this.mum2 = this.matter.add.sprite(200,200, 'mummy');

		this.character.add(this.mum);
		this.character.add(this.mum2);

		let framies =  this.anims.generateFrameNumbers('mummy', {start:0, end:17});
		this.anims.create({
				key: 'walk',
				frames: framies,
				frameRate: 30,
				repeat:-1
			});
		this.mum.anims.play('walk');
		//mum2.anims.play('walk');

		this.input.on('pointerdown', (pointer) => {
			// console.log(this.character.children.entries);
			for (var child of this.character.children.entries) {
				child.x = pointer.x;
				child.y = pointer.y;
			}
		});

	}

	update(delta) {
		// console.log(this.mum.x);
		//this.mum.position.x = this.pointer.x;
	}
}