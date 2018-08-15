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
      if (this.game[gameID].numPlayers < this.game[gameID].capacity){

        /*Create and ID for the new player and send the new player the current game*/
        let newPlayerID = this.game[gameID].numPlayers +=1;
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
    /* if(this.clients[i].readyState != this.clients[0].OPEN){
        console.error('Client state is ' + this.clients[i].readyState);
    }
    else{
        this.clients[i].send(data);
    }*/
    
    for (var playerID in this.game[gameID].sockets){
      this.game[gameID].sockets[playerID].send(message);
    }
  },

  tempGame(){
    //idea to fix players leaving:
        //decrease capacity and use it as a way to tell how many players can join
        //rename numPlayers to next id or something like that so that it assigns an id 
        //for the next player
      this.game[this.numGames] = {
        id: this.numGames,
        capacity: 6,
        numPlayers: 0,
        players: {},
        sockets: {}
      };
  },

  tempUser(data, gameID){
    let player = {
      x: Math.floor(Math.random()*700)+50,
      y: Math.floor(Math.random()*500)+50,
      angle: 0,
      hp: 300,
      mp: 300,
      team: (Math.floor(Math.random()*2)==0)? 'red':'blue',
      character: 'warrior',
      username: data.username,
      id: this.game[gameID].numPlayers
    }
    return player;
  }
};

export default gameLobbyServer;