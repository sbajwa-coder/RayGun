import warrior from '../../client/game-objects/characters/warriorModel.js';
import player from '../../client/game-objects/player/player.js';
import gameObject from '../../client/game-objects/game/gameObject.js';
import serverMessages from './serverMessages.js';

function lobbyServerFunctions(server){
	const webserver = server;
  let message = new serverMessages(webserver);

  this.joinGame = function(ws,data){
    let gameID = data.gameID;
    let newPlayer = this.createUser(data); //temp function to set up user

    /*Check if game with gameID exists and has space*/
    if (gameID <= webserver.gameNumber && gameID > 0){
      if (webserver.gameList[gameID].capacity > 0){
        /*New character transmit*/
        let joinID = webserver.gameList[gameID].playerNumber +=1;
        message.sendWorld(gameID, joinID, ws);

        /*make the change to all*/
        webserver.gameList[gameID].joinGame(newPlayer,ws);
        message.sendPlayerUpdate(gameID, newPlayer);

      }else{
        console.log("Yo somethings up in gameLobby fam!!!!!?"); //not able to join the game
      }
    }else {
      console.log("Yo what game you tryna join guy?")
    }
  }

  this.leaveGame = function(data){
    let gameID = data.gameID;
    let joinID =  data.joinID;

    /*Delete the player and socket from the list of players*/
    webserver.gameList[gameID].leaveGame(joinID);
    message.sendPlayerRemove(gameID, joinID);
  }

  this.createUser = function(data){
    let x = Math.floor(Math.random()*700)+50;
    let y = Math.floor(Math.random()*500)+50;

    let createdPlayer = new player(Math.floor(Math.random()*700)+50/*random ID*/, data.username /*Random username*/);
    createdPlayer.x = x;
    createdPlayer.y = y;

    return createdPlayer;
  }
  
  this.createGame = function(){
    webserver.gameNumber+=1;
    webserver.gameList[webserver.gameNumber] = new gameObject(webserver.gameNumber, 6);
  }

  this.movementUpdate = function(data){//temp
    webserver.gameList[data.gameID].players[data.playerID].x = data.x;
    webserver.gameList[data.gameID].players[data.playerID].y = data.y;
    webserver.gameList[data.gameID].players[data.playerID].angle = data.angle;
    webserver.gameList[data.gameID].players[data.playerID].rotation = data.rotation;
  }

  this.changeSetting = function(data){
    let gameID = data.gameID;
    let self = this;

    switch (data.setting) {
      case 'CHANGE_MAP':
        webserver.gameList[gameID].map = data.map;
        break;

      case 'CHANGE_GAME_MODE':
        webserver.gameList[gameID].gameMode = data.gameMode;
        break;

      /*case 'CHANGE_PLAYER_TEAM':
        webserver.gameList[gameID].leaveTeam();
        webserver.gameList[gameID].joinTeam(data.team);
        break;*/

      case 'KICK_PLAYER':
        self.leaveGame(data);
        break;

      default:
        break;
    }
  }
}

export default lobbyServerFunctions;