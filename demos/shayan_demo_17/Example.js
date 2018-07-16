class Example extends Phaser.Scene {
	constructor() {
		super({
			key: "Example"});
	}

	preload() {
		this.load.spritesheet('mummy'
		,'assets/metalslug_mummy37x45.png', 
		{ frameWidth: 37, frameHeight: 45});

		this.load.atlas('warrior_torso', 'assets/run/torso/spritesheet.png',
						'assets/run/torso/spritesheet.json');

		this.load.atlas('warrior_legs', 'assets/run/legs/spritesheet.png',
						'assets/run/legs/spritesheet.json');

		
	}

	create() {
		// this.matter.add.mouseSpring();
		this.matter.world.setBounds(0, 0, game.config.width, game.config.height);

		// this.player = this.matter.add.sprite(300,300, 'mummy');
		// this.player.setCollisionCategory(0);
		// this.player.setCollidesWith([0,1]);
		// this.player.speed = 1.5;


		// WARRIOR
		this.warrior_legs = this.add.sprite(150,150,'warrior_legs','tile000.png');
		//this.warrior_legs.setCollisionCategory(0);

		this.warrior_torso = this.matter.add.sprite(150,150,'warrior_torso','tile000.png');
		//this.warrior_torso.setCollisionGroup(23);
		this.warrior_torso.setCollisionCategory(0);

		let warriorTorsoFrames = this.anims.generateFrameNames('warrior_torso', { start: 0, end: 15, zeroPad: 3, prefix: 'tile', suffix: '.png' });
		this.anims.create({ key: 'run_torso', frames: warriorTorsoFrames, frameRate: 30, repeat: -1 });
		// this.warrior_torso.anims.play('run_legs');

		let warriorLegFrames = this.anims.generateFrameNames('warrior_legs', { start: 0, end: 15, zeroPad: 3, prefix: 'tile', suffix: '.png' });
		this.anims.create({ key: 'run_legs', frames: warriorLegFrames, frameRate: 30, repeat: -1 });
		// this.warrior_legs.anims.play('run_torso');

		this.warrior = {main: this.warrior_torso,
						parts: [this.warrior_legs],
						speed: 3};

		//this.matter.add.constraint(this.warrior_torso, this.warrior_legs, 100, 0.2);

		let framies =  this.anims.generateFrameNumbers('mummy', {start:0, end:17});
		this.anims.create({
				key: 'walk',
				frames: framies,
				frameRate: 30,
				repeat:-1
			});

		// this.input.on('pointerdown', (pointer) => {
		// 	// console.log(this.character.children.entries);
		// 	for (var child of this.character.children.entries) {
		// 		child.x = pointer.x;
		// 		child.y = pointer.y;
		// 	}
		// });

		this.arrowKeys = this.input.keyboard.createCursorKeys();
		// console.log(this.input.mouse)


		this.input.on('pointermove', (pointer) => {

			let angle = Math.atan2(pointer.y-this.warrior.main.y, pointer.x-this.warrior.main.x) - (90*(Math.PI/180));

			//this.warrior.main.setAngle(Phaser.Math.RAD_TO_DEG*angle);
		});

		this.moving = false;
	}

	update(delta) {

		Phaser.Display.Align.In.Center(this.warrior_legs, this.warrior_torso);
		this.warrior_legs.setAngle(this.warrior_torso.angle);

		this.moving = false;
		let opposite = Math.sin(this.warrior.main.rotation) * this.warrior.speed;	
		let adjacent = Math.cos(this.warrior.main.rotation) * this.warrior.speed;

		if (this.arrowKeys.left.isDown){
			this.moving = true;
			// this.player.flipX = true;
			// this.player.setAngle(0);
			// this.player.x -= this.player.speed;

			// this.warrior.main.x += adjacent;
			// this.warrior.main.y += opposite;
			this.warrior.main.angle -= 3;
		}
		else if (this.arrowKeys.right.isDown){
			this.moving = true;
			// this.player.flipX = false;
			// this.player.setAngle(0);
			// this.player.x += this.player.speed;

			// this.warrior.main.x -= adjacent;
			// this.warrior.main.y -= opposite;
			this.warrior.main.angle += 3;
		}

		if (this.arrowKeys.up.isDown){
			this.moving = true;
			// if (this.player.flipX) {
			// 	this.player.setAngle(90);
			// } else {
			// 	this.player.setAngle(270);
			// }
			// this.player.y -= this.player.speed;

			// this.warrior.main.y -= this.warrior.speed;

			

			this.warrior.main.x -= opposite;
			this.warrior.main.y += adjacent;
		}
		if (this.arrowKeys.down.isDown){
			this.moving = true;
			// if (this.player.flipX) {
			// 	this.player.setAngle(270);
			// } else {
			// 	this.player.setAngle(90);
			// }
			
			// this.player.y += this.player.speed;
			// this.warrior.main.y += this.warrior.speed;

			this.warrior.main.x += opposite*0.5;
			this.warrior.main.y -= adjacent*0.5;

			// this.warrior_legs.anims.setTimeScale(0.5);
			// this.warrior_torso.anims.setTimeScale(0.5);
		}

		if (this.moving) {
			this.warrior_legs.play('run_legs', true);
			this.warrior_torso.play('run_torso', true);
			
		} else {
			this.warrior.parts[0].anims.stop('run_legs');
			this.warrior.main.anims.stop('run_torso');
			this.warrior.parts[0].setFrame(0);
			this.warrior.main.setFrame(0);
		}
	}
}