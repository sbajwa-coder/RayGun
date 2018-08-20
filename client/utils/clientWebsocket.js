/********************************************** WEBSOCKET FUNCTIONS **********************************************/
function clientWebsocket(){
	/*Connect to the websocket server*/
	this.ws = new WebSocket('ws://localhost:8080');

	this.ws.onopen = function(){
		createAccount();
	}

	this.ws.onmessage = function(event){
		let data = JSON.parse(event.data);

		switch (data.type) {
			/*Updates user's game whenever a new player joins the game*/
			case 'update':
				console.log('update');
				break;

			/*Initalizes the user's game when the user first joins the game*/
			case 'join':
				console.log('join');
				break;

			

			/*case 't':
				self.players.getChildren().forEach(function(player){
					//fix issues id in player.playerId is a string
					//maybe make this faster by breaking?
					if (data.playerID == player.id){
		                 player.x = data.x;
		                 player.y = data.y;
		                 player.angle = data.angle;
		            }
		        });
				break;*/

			default:
				break;
		}
	}
}


function createAccount(){
	/*send user information to server*/ 
	var randomName = "J"+Math.floor(Math.random()*700)+50; //temp name creation
	self.ws.send(JSON.stringify({username:randomName, type:"join", gameID: 1})); //fixed information sent to server
}

export default clientWebsocket;