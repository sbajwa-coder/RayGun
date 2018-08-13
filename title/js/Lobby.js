class Lobby extends Phaser.Scene {
	constructor() {
		super({
			key: "Lobby"});
	}

	preload() {
		this.load.spritesheet('mummy'
		,'../assets/metalslug_mummy37x45.png', { frameWidth: 37, frameHeight: 45});
	}

	create() {
		this.matter.world.setBounds(0, 0, game.config.width, game.config.height);

		this.mummy = this.matter.add.sprite(150,150,'mummy');

		let framies =  this.anims.generateFrameNumbers('mummy', {start:0, end:17});
		this.anims.create({
				key: 'walk',
				frames: framies,
				frameRate: 30,
				repeat:-1
		});
		this.mummy.play('walk');


	}

	update(delta) {
	}
}