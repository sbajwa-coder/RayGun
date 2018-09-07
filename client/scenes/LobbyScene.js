import $ from '../../node_modules/jquery/dist/jquery.js';
import uiAnimations from '../utils/UI/animations.js'; 
import titlePageInteractions from '../utils/UI/title-page.js';
import lobbyPageInteractions from '../utils/UI/lobby-page.js';

class LobbyScene extends Phaser.Scene{
	constructor(){
		super({
			key: 'LobbyScene'
		});
	}

	preload(){}

	create() {
		var self = this;

		$("#pageContainer").load('../assets/html/lobby-page.html', function() {
			titlePageInteractions($, uiAnimations);
			lobbyPageInteractions($, uiAnimations);

			document.addEventListener("logoutEvent", function(e) {
				self.scene.start("TitleScene");
			});

			document.addEventListener("joinGameEvent", function(e) {
				setTimeout(function() {
					console.log(self.scene.boot);
					self.scene.start("GameLobbyScene");
				}, 0);
			});
		});
	}
}

export default LobbyScene;