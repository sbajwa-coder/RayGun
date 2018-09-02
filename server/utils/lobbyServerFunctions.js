import warrior from '../../client/game-objects/characters/warriorModel.js';
import player from '../../client/game-objects/player/player.js';
import serverMessages from './serverMessages.js';

function lobbyServerFunctions(server){
	const webserver = server;
  let message = new serverMessages(webserver);

  this.joinGame = function(ws,data){
    let gameID = data.gameID;

    /*Check if game with gameID exists and has space*/
    if (gameID <= webserver.gameNumber && gameID > 0){
      if (webserver.gameList[gameID].capacity > 0){
        
        /*Create and ID and make user for the new player*/
        let joinID = webserver.gameList[gameID].playerNumber +=1;
        let newPlayer = this.createUser(data, joinID, gameID); //temp function to set up user

        /*Add new player to the game*/
        webserver.gameList[gameID].players[joinID] = newPlayer; //need to add a fix for when a player leaves the game
        webserver.gameList[gameID].sockets[joinID] = ws;

        message.sendWorld(gameID, joinID, ws);
        message.sendPlayerUpdate(gameID, newPlayer);

      }else{
        console.log("Yo somethings up in gameLobby fam!!!!!?")
      }
    }else {
      console.log("Yo what game you tryna join guy?")
    }
  }

  this.leaveGame = function(data){
    let gameID = data.gameID;
    let joinID =  data.joinID;

    /*Delete the player and socket from the list of players*/
    delete webserver.gameList[gameID].players[joinID];
    delete webserver.gameList[gameID].sockets[joinID];

    message.sendPlayerRemove(gameID, joinID);
  }

  this.createUser = function(data, joinID, gameID){
    /*Player should not be created here*/
    //temp team create
    let team = (Math.floor(Math.random()*2)==0)? 'red':'blue';
    let x = Math.floor(Math.random()*700)+50;
    let y = Math.floor(Math.random()*500)+50;

    let createdPlayer = new player(Math.floor(Math.random()*700)+50/*random ID*/, data.username /*Random username*/);
    createdPlayer.changeTeam(team);
    createdPlayer.joinLobby(gameID, joinID);
    createdPlayer.x = x;
    createdPlayer.y = y;

    return createdPlayer;
  }
  
  this.createGame = function(){
    //idea to fix players leaving:
        //decrease capacity and use it as a way to tell how many players can join
        //rename numPlayers (already did) to next id or something like that so that it assigns an id 
        //for the next player
    webserver.gameNumber+=1;
    webserver.gameList[webserver.gameNumber] = {
      id: webserver.gameNumber,
      capacity: 6,
      playerNumber: 0,
      players: {},
      sockets: {}
    };
  }

  this.movementUpdate = function(data){//temp
    webserver.gameList[data.gameID].players[data.playerID].x = data.x;
    webserver.gameList[data.gameID].players[data.playerID].y = data.y;
    webserver.gameList[data.gameID].players[data.playerID].angle = data.angle;
    webserver.gameList[data.gameID].players[data.playerID].rotation = data.rotation;
  }
}

export default lobbyServerFunctions;