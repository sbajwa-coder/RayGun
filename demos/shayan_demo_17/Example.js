class Example extends Phaser.Scene {
	constructor() {
		super({
			key: "Example"});
	}

	preload() {
		this.load.spritesheet('mummy'
		,'assets/metalslug_mummy37x45.png', 
		{ frameWidth: 37, frameHeight: 45});

		this.load.atlas('warrior_torso', 'assets/run/torso/warrior_run_torso_spritesheet.png',
						'assets/run/torso/warrior_run_torso_spritesheet.json');

		this.load.atlas('warrior_legs', 'assets/run/legs/warrior_run_legs_spritesheet.png',
						'assets/run/legs/warrior_run_legs_spritesheet.json');

		
	}

	create() {
		this.matter.add.mouseSpring();
		this.matter.world.setBounds(0, 0, game.config.width, game.config.height);

		let stack = Phaser.Physics.Matter.Composites;

		this.character = this.add.group();


		this.player = this.matter.add.sprite(400,400, 'mummy');
		//this.player.setCollisionCategory(0);
		this.player.setCollidesWith([0,1]);
		this.player.speed = 1.5;


		// WARRIOR
		this.warrior = this.add.group();
		this.warrior_legs = this.add.sprite(150,150,'warrior_legs','tile000.png');
		//this.warrior_legs.setCollisionCategory(0);

		this.warrior_torso = this.matter.add.sprite(150,150,'warrior_torso','tile000.png');
		//this.warrior_torso.setCollisionGroup(23);
		//this.warrior_torso.setCollisionCategory(1);
		this.warrior.add(this.warrior_legs);
		this.warrior.add(this.warrior_torso);

		console.log(this.warrior);
		
		this.character.add(this.warrior_legs);
		this.character.add(this.warrior_torso);

		let warriorTorsoFrames = this.anims.generateFrameNames('warrior_torso', { start: 0, end: 15, zeroPad: 3, prefix: 'tile', suffix: '.png' });
		this.anims.create({ key: 'run_legs', frames: warriorTorsoFrames, frameRate: 30, repeat: -1 });
		this.warrior_torso.anims.play('run_legs');

		let warriorLegFrames = this.anims.generateFrameNames('warrior_legs', { start: 0, end: 15, zeroPad: 3, prefix: 'tile', suffix: '.png' });
		this.anims.create({ key: 'run_torso', frames: warriorLegFrames, frameRate: 30, repeat: -1 });
		this.warrior_legs.anims.play('run_torso');


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
		this.moving = false;
	}

	update(delta) {
		Phaser.Display.Align.In.Center(this.warrior_legs, this.warrior_torso);
		this.warrior_legs.setAngle(this.warrior_torso.angle);
		this.moving = false;

		if (this.arrowKeys.left.isDown){
			this.moving = true;
			this.player.flipX = true;
			this.player.setAngle(0);
			this.player.x -= this.player.speed;
		}
		else if (this.arrowKeys.right.isDown){
			this.moving = true;
			this.player.flipX = false;
			this.player.setAngle(0);
			this.player.x += this.player.speed;
		}

		if (this.arrowKeys.up.isDown){
			this.moving = true;
			if (this.player.flipX) {
				this.player.setAngle(90);
			} else {
				this.player.setAngle(270);
			}
			this.player.y -= this.player.speed;
		}
		if (this.arrowKeys.down.isDown){
			this.moving = true;
			if (this.player.flipX) {
				this.player.setAngle(270);
			} else {
				this.player.setAngle(90);
			}
			
			this.player.y += this.player.speed;
		}

		if (this.moving) {
			this.player.anims.play('walk', true);
		} else {
			this.player.anims.stop('walk');
			this.player.setFrame(0);
		}
	}
}