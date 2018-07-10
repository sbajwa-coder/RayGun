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

		this.load.multiatlas('yeet', 'assets/fruitsprites.json', "assets");
	}

	create() {
		// this.warrior = this.matter.add.sprite(100,100,"warrior")
		//this.image = this.add.image(300, 300, 'warrior');
		this.shapes = this.cache.json.get('shapes');
		this.matter.world.setBounds(0, 0, game.config.width, game.config.height);
		this.add.image(0, 0, 'sheet', 'background').setOrigin(0, 0);

		var ground = this.matter.add.sprite(0, 0, 'sheet', 'ground', {shape: this.shapes.ground});
		ground.setPosition(0 + ground.centerOfMass.x, 0 + ground.centerOfMass.y);

		// Classic mummy spritesheet animation
		let mum = this.add.sprite(500,500,'mummy');
		mum.setScale(2,2);
		let framies =  this.anims.generateFrameNumbers('mummy', {start:0, end:17});
		this.anims.create({
				key: 'walk',
				frames: framies,
				frameRate: 30,
				repeat:-1
			});
		mum.anims.play('walk');

		// matter fruit sprite
		this.player = this.matter.add.sprite(100,100, 'sheet', 'crate', {shape: this.shapes.crate});

		// atlas animation
		var frameNames = this.anims.generateFrameNames('sheet', {frames: ['crate', 'cherries', 'banana']});
    	this.anims.create({ key: 'loop', frames: frameNames, frameRate: 10, repeat: -1 });
    	// CLASSIC ANIIMATION disabled
    	//this.player.anims.play('loop');


    	var counter = 0;
    	var yee = this.player;
    	frames = [{frame: 'banana', shape: this.shapes.banana}, {frame: 'crate', shape: this.shapes.crate}];
    	setInterval(function() {
    		let idx = counter%2;
    		yee.setFrame(frames[idx].frame);
    		yee.setPosition(yee.x, yee.y)
    		yee.setBody(frames[idx].shape);
    		counter ++;
    	}, 1000);

		this.key_1 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ONE);
	}

	update(delta) {
		if(this.key_1.isDown) {
			this.player.setBody(this.shapes.banana);
			this.player.setFrame('banana');
			this.player.setPosition(this.player.x, this.player.y);
		}
	}
}