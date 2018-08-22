class Title extends Phaser.Scene {
	constructor() {
		super({
			key: "Title"});
	}

	preload() {
	}

	create() {

		var self = this;

		$("#pageContainer").load('../html/title-page.html', function() {
			$("form").disableAutoFill();

			$.when(
			    $.getScript( "js/UI/animations.js" ),
			    $.getScript("js/UI/title-page.js"),
			    $.Deferred(function( deferred ){
			        $( deferred.resolve );
			    })
			).done(function(data, textStatus, jqxhr ){
				console.log('javascript assets finished loading');
				document.addEventListener("loginEvent", function(e) {
				  self.scene.start("Lobby");
				});
			});
		});
		
	}

	update(delta) {

	}
}