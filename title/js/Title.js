class Title extends Phaser.Scene {
	constructor() {
		super({
			key: "Title"});
	}

	preload() {
		this.load.image('background', '../assets/shockfort-bg.png');
		this.load.image('play_button', '../assets/play-button.png');
	}

	create() {
		// var bg = this.add.image(0,0,'background');
		// bg.setDisplaySize(800,600);

		// var playButton = this.add.image(0,0,'play_button');
		// playButton.setDisplayOrigin(112,50);
		// Phaser.Display.Align.In.Center(bg, this.add.zone(400, 300, 800, 600));
		// Phaser.Display.Align.In.Center(playButton, bg);

	    $("#shockfort-game").load('../html/entry-screen.html');
	}

	update(delta) {
	}
}