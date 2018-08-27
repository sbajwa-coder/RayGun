function lobbyServerFunctions(server){
	const socket = server;

	this.newPlayerMessage = function(players,joinID,gameID){
		let newPlayerMessage = {
          type: 'WORLD_RECIEVE',
          players: gameList[gameID].players,
          joinID: joinID,
          gameID: gameID
        } 

        socket.sendMessage(newPlayerMessage);
	}
}

export default lobbyServerFunctions;