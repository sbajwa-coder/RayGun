import $ from '../../node_modules/jquery/dist/jquery.js';
import uiAnimations from '../utils/UI/animations.js'; 
import titlePageInteractions from '../utils/UI/title-page.js';

class TitleScene extends Phaser.Scene{
	constructor(){
		super({
			key: 'TitleScene'
		});
	}

	preload(){}

	create() {
		var self = this;

		$("#pageContainer").load('../assets/html/title-page.html', function() {
			titlePageInteractions($, uiAnimations);

			document.addEventListener("loginEvent", function(e) {
			  self.scene.start("LobbyScene");
			});
		});
	}
}

export default TitleScene;