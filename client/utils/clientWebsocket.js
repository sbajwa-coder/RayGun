/********************************************** WEBSOCKET FUNCTIONS **********************************************/
function ClientWebsocket(){ //Make this a class and make a constructor for singleton
	/*Connect to the websocket server*/
	const ws = new WebSocket('ws://localhost:8080');
	let command;

	this.serveClient = function(){
		ws.onopen = function(){
			createAccount();
			console.log('new account who this');
		}

		ws.onmessage = function(event){
			let data = JSON.parse(event.data);

			switch (data.type) {
				case 'WORLD_RECIEVE':
					console.log('join');
					command.createWorld(data);
					break;

				case 'PLAYER_JOIN_UPDATE':
					console.log('update');
					command.addPlayer(data.player);
					break;
				
				case 'PLAYER_REMOVE_UPDATE':
					console.log('leave');
					command.removePlayer(data);
					break;

				case 'PLAYER_MOVE':
					console.log('move');
					command.movePlayer(data);
					break;

				default:
					break;
			}
		}

		window.onbeforeunload = function(){
	    	ws.send(JSON.stringify(command.disconnect()));
	    	ws.close();
	    }
	}

	this.setCommands = function(sceneFunction){
		command = sceneFunction;
	}

	this.sendMessage = function(data){
		ws.send(JSON.stringify(data));
	}

	function createAccount(){
		/*send user information to server*/ 
		var randomName = "J"+Math.floor(Math.random()*700)+50; //temp name creation
		ws.send(JSON.stringify({username:randomName, type:"join", gameID: 1})); //fixed information sent to server
	}
}

let instance;

const client = function(sceneFunction){
	if (!instance){
		instance = new ClientWebsocket();
	}
	
	instance.setCommands(sceneFunction);
	instance.serveClient();
}

client.send = function(data){
	instance.sendMessage(data)
};

export default client;