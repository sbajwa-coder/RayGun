function ServerMessages(server){
	const webserver = server;

  /*Send the word for first time join*/
	this.sendWorld = function(gameID, joinID, ws){
    let message = {
      type: 'WORLD_RECIEVE',
      players: webserver.gameList[gameID].players,
      joinID: joinID,
      gameID: gameID,
      background: 'map_template' //fixed
    } 

    webserver.sendMessage(ws, message);
	}

  /*Send new player update*/
  this.sendPlayerUpdate = function(gameID, newPlayer){
    let message = {
      type: 'PLAYER_JOIN_UPDATE',
      player: newPlayer
    }

    webserver.broadcastToGame(gameID, message);
  }

  /*Send player leave*/
  this.sendPlayerRemove = function(gameID, joinID){
    let message = {
      type: 'PLAYER_REMOVE_UPDATE',
      joinID: joinID
    }

    webserver.broadcastToGame(gameID, message);
  }
  
}

export default ServerMessages;