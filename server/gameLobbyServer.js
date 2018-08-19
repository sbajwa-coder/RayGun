import warrior from '../client/game-objects/characters/warriorModel.js';
import player from '../client/game-objects/player/player.js';

const gameLobbyServer = {
  init: function(wss){
    this.wss = wss;
    this.game = {};
    this.numGames = 1; //fixed so there is only 1 game atm
    gameLobbyServer.tempGame(); //temp function to setup game
  },

  lobbyServer: function(ws){
    ws.on('message', function(message) {
      var data = JSON.parse(message);

      switch (data.type) {
        //need a case for creating games
        case 'join':
          gameLobbyServer.joinRoom(ws,data);
          break;

        case 'leave':
          gameLobbyServer.leave(data);
          break;

        case 'move':
          //need to update server x y and angle
          gameLobbyServer.broadcastToGame(data.gameID, data);
          break;

        case 'umove':
          gameLobbyServer.uMove(data);
          break;

        case 't':
          //need to update server x y and angle
          gameLobbyServer.uMove(data);
          gameLobbyServer.broadcastToGame(data.gameID, data);
          break;

        default:
          break;
      }
    });
  },

  joinRoom: function(ws,data){
    let gameID = data.gameID;

    /*Check if game with gameID exists*/
    if (gameID <= this.numGames){
      /*Check if game has space*/
      if (this.game[gameID].capacity > 0){

        /*Create and ID for the new player and send the new player the current game*/
        let newPlayerID = this.game[gameID].playerNumber +=1;
        let newPlayerMessage = {
          type: 'join',
          players: this.game[gameID].players,
          playerID: newPlayerID,
          gameID: gameID
        }   
        ws.send(JSON.stringify(newPlayerMessage));

        /*Make the new player*/
        let newPlayer = gameLobbyServer.tempUser(data, gameID); //temp function to set up user

        /*Add new player to the game*/
        this.game[gameID].players[newPlayerID] = newPlayer; //need to add a fix for when a player leaves the game
        this.game[gameID].sockets[newPlayerID] = ws;

        let message = {
          type: 'update',
          player: newPlayer
        }
        gameLobbyServer.broadcastToGame(gameID, message);

      }else{
        console.log("Yo somethings up in gameLobby fam!!!!!?")
      }
    }else {
      console.log("Yo what game you tryna join guy?")
    }
  },

  leave: function(data){
    let gameID = data.gameID;
    let playerID =  data.playerID;

    let message = {
      type: 'remove',
      playerID: playerID
    }

    /*Delete the player and socket from the list of players*/
    delete this.game[gameID].players[playerID];
    delete this.game[gameID].sockets[playerID]; //figure out what to do with playerID

    gameLobbyServer.broadcastToGame(data.gameID, message)
  },

  move: function(){

  },

  broadcastToGame: function(gameID, message){
    message = JSON.stringify(message);
    
    for (var playerID in this.game[gameID].sockets){
      let client = this.game[gameID].sockets[playerID];

      /*Check if the client socket is open*/
      if(client.readyState === client.OPEN){
        client.send(message);
      }else{
        console.error('Player ', playerID, ' is not ready to get messages');
      }
    }
  },

  tempGame(){
    //idea to fix players leaving:
        //decrease capacity and use it as a way to tell how many players can join
        //rename numPlayers (already did) to next id or something like that so that it assigns an id 
        //for the next player
      this.game[this.numGames] = {
        id: this.numGames,
        capacity: 6,
        playerNumber: 0,
        players: {},
        sockets: {}
      };
  },

  tempUser(data, gameID){
    /*Player should not be created here*/
    //temp team create
    let team = (Math.floor(Math.random()*2)==0)? 'red':'blue'
    let x = Math.floor(Math.random()*700)+50;
    let y = Math.floor(Math.random()*500)+50;

    let createdPlayer = new player(Math.floor(Math.random()*700)+50/*random ID*/, data.username /*Random username*/);
    createdPlayer.changeTeam(team);
    createdPlayer.joinLobby(gameID, this.game[gameID].playerNumber);
    createdPlayer.character.x = x;
    createdPlayer.character.y = y;

    console.log(createdPlayer);
    return createdPlayer;
  },

  uMove(data){//temp
    this.game[data.gameID].players[data.playerID].character.x = data.x;
    this.game[data.gameID].players[data.playerID].character.y = data.y;
    this.game[data.gameID].players[data.playerID].character.angle = data.angle;
    this.game[data.gameID].players[data.playerID].character.rotation = data.rotation;
  } 
};

export default gameLobbyServer;