class Example3 extends Phaser.Scene{
	constructor(){
		super({key:"Example3"});
	}

	preload(){
		this.load.audio('test',['assets/robeast.mp3']);
	}

	create(){
		this.soundFX = this.sound.add("test",{loop:"true",volume:0.1});
		this.soundFX.play();

		this.input.keyboard.on("keydown_L",function(e){
			this.soundFX.loop = !this.soundFX.loop;
			if (this.soundFX.loop) this.soundFX.play();
			if (!this.soundFX.loop) this.soundFX.stop();
		},this);

		this.input.keyboard.on("keydown_P", function(e){
			if (this.soundFX.isPlaying) this.soundFX.pause();
			else this.soundFX.resume();
		},this);
	}
}