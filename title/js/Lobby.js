class Lobby extends Phaser.Scene {
	constructor() {
		super({
			key: "Lobby"});
	}

	init(data) {

	}
	
	preload() {
		// this.load.spritesheet('mummy'
		// ,'../assets/metalslug_mummy37x45.png', { frameWidth: 37, frameHeight: 45});
	}

	create() {

		var self = this;

		$("#pageContainer").load('../html/lobby-page.html', function() {
			$("form").disableAutoFill();

			$.when(
			    $.getScript( "js/UI/animations.js" ),
			    $.getScript("js/UI/title-page.js"),
			    $.getScript("js/UI/lobby-page.js"),
			    $.Deferred(function( deferred ){
			        $( deferred.resolve );
			    })
			).done(function(data, textStatus, jqxhr ){
				console.log('javascript assets finished loading');

				// document.addEventListener("loginEvent", function(e) {
				//   self.scene.start("Lobby");
				// });
			});
		});
		


		// self.matter.world.setBounds(0, 0, game.config.width, game.config.height);

		// self.mummy = self.matter.add.sprite(150,150,'mummy');

		// let framies =  self.anims.generateFrameNumbers('mummy', {start:0, end:17});
		// self.anims.create({
		// 		key: 'walk',
		// 		frames: framies,
		// 		frameRate: 30,
		// 		repeat:-1
		// });
		// self.mummy.play('walk');
	}

	update(delta) {
	}
}