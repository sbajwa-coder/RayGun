class Example1 extends Phaser.Scene {
	constructor() {
		super({key: "Example1"});
	}

	preload() {
		this.load.image('allmight','assets/allmight.png');
	}

	create() {
		this.image = this.add.image(300, 300, 'allmight');
	}
}