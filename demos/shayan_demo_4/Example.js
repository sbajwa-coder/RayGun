class Example extends Phaser.Scene {
	constructor() {
		super({
			key: "Example"});
	}

	preload() {
		this.load.image('warrior','./warrior.png');
		this.load.atlas('sheet', 'assets/fruit-sprites.png', 'assets/fruit-sprites.json');
		this.load.json('shapes', 'assets/fruit-shapes.json');
		this.load.spritesheet('mummy'
		,'assets/metalslug_mummy37x45.png', 
		{ frameWidth: 37, frameHeight: 45});


		this.load.multiatlas('cityscene', 'assets2/cityscene.json', "assets2");
	}

	create() {
		// this.warrior = this.matter.add.sprite(100,100,"warrior")
		//this.image = this.add.image(300, 300, 'warrior');
		var shapes = this.cache.json.get('shapes');
		this.matter.world.setBounds(0, 0, game.config.width, game.config.height);
		this.add.image(0, 0, 'sheet', 'background').setOrigin(0, 0);

		var ground = this.matter.add.sprite(0, 0, 'sheet', 'ground', {shape: shapes.ground});
		ground.setPosition(0 + ground.centerOfMass.x, 0 + ground.centerOfMass.y);
		// this.matter.add.sprite(200, 50, 'sheet', 'crate', {shape: shapes.crate});
		// this.matter.add.sprite(250, 250, 'sheet', 'banana', {shape: shapes.banana});
		// this.matter.add.sprite(360, 50, 'sheet', 'orange', {shape: shapes.orange});
		// this.matter.add.sprite(400, 250, 'sheet', 'cherries', {shape: shapes.cherries});

		// let player = this.add.sprite(100,100,'mummy');
		// player.setScale(2,2);
		// this.anims.create({
		// 		key: 'walk',
		// 		frames: this.anims.generateFrameNumbers('mummy', {
		// 			start:0, end:17}),
		// 		frameRate: 30,
		// 		repeat:-1
		// 	});

		// player.anims.play('walk');
		var player = this.matter.add.sprite(100,100, 'sheet', 'crate', {shape: shapes.crate});
		// player.setScale(2,2);
		this.anims.create({
			key: 'walk',
			frames: this.anims.generateFrameNumbers('mummy', {
				start: 0, end: 17
			}),
			frameRate: 30,
			repeat: -1
		});
		player.anims.play('walk');
	}
}