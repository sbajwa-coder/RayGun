class Example extends Phaser.Scene {
	constructor() {
		super({
			key: "Example"});
	}

	preload() {
		this.load.image('warrior','./warrior.png');
		this.load.atlas('sheet', 'assets/fruit-sprites.png', 'assets/fruit-sprites.json');
		this.load.json('shapes', 'assets/fruit-shapes.json');
	}

	create() {
		// this.warrior = this.matter.add.sprite(100,100,"warrior")
		//this.image = this.add.image(300, 300, 'warrior');
		var shapes = this.cache.json.get('shapes');
		this.matter.world.setBounds(0, 0, game.config.width, game.config.height);
		this.add.image(0, 0, 'sheet', 'background').setOrigin(0, 0);

		var ground = this.matter.add.sprite(0, 0, 'sheet', 'ground', {shape: shapes.ground});
		ground.setPosition(0 + ground.centerOfMass.x, 0 + ground.centerOfMass.y);
		this.matter.add.sprite(200, 50, 'sheet', 'crate', {shape: shapes.crate});
		this.matter.add.sprite(250, 250, 'sheet', 'banana', {shape: shapes.banana});
		this.matter.add.sprite(360, 50, 'sheet', 'orange', {shape: shapes.orange});
		this.matter.add.sprite(400, 250, 'sheet', 'cherries', {shape: shapes.cherries});
	}
}