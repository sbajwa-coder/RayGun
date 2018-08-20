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
		
		$("#shockfort-game").load('../html/entry-screen.html', function() {
			$.when(
			    $.getScript( "js/UI/animations.js" ),
			    $.getScript("js/UI/entry-screen.js"),
			    $.Deferred(function( deferred ){
			        $( deferred.resolve );
			    })
			).done(function(data, textStatus, jqxhr ){
				console.log('javascript assets finished loading');
			});
		});
		// $("body").click(function(event) {
		// 	 Act on the event 
		// 	alert($(this));
		// });
		// $(".button").hover(function() {
		// 	/* Stuff to do when the mouse enters the element */
		// 	alert("trynna login boi?");
		// 	const currentWidth = $(this).css("width");
		// 	$(this).css("width", currentWidth + 10);
		// }, function() {
		// 	/* Stuff to do when the mouse leaves the element */
		// });
	}

	update(delta) {

	}
}