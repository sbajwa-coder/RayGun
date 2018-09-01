import warrior from '../client/game-objects/characters/warriorModel.js';
import player from '../client/game-objects/player/player.js';

function ServerWebsocket(){
  let gameList = {};
  let gameNumber = 0;

  this.serveClient = function(ws){
    ws.on('message', function(message) {
      let data = JSON.parse(message);

      switch (data.type) {
        case 'WORLD_CREATE':
          console.log('make');
          ServerWebsocket.makeGame();
          break;
          
        case 'WORLD_CONNECT':
          console.log('join');
          joinGame(ws,data);
          break;

        case 'WORLD_DISCONNECT':
          console.log('leave');
          leaveGame(data);
          break;

        case 'PLAYER_MOVE':
          console.log('move');
          //need to update server x y and angle
          broadcastToGame(data.gameID, data);
          break;

        case 'umove':
          uMove(data);
          break;

        default:
          break;
      }
    });
  }

  function joinGame(ws,data){
    let gameID = data.gameID;

    /*Check if game with gameID exists and has space*/
    if (gameID <= gameNumber && gameID > 0){
      if (gameList[gameID].capacity > 0){
        
        /*Create and ID for the new player and send the new player the current game*/
        let joinID = gameList[gameID].playerNumber +=1;
        let newPlayerMessage = {
          type: 'WORLD_RECIEVE',
          players: gameList[gameID].players,
          joinID: joinID,
          gameID: gameID,
          background: 'map_template' //fixed
        }   
        ws.send(JSON.stringify(newPlayerMessage));

        /*Make the new player*/
        let newPlayer = makeUser(data, joinID, gameID); //temp function to set up user

        /*Add new player to the game*/
        gameList[gameID].players[joinID] = newPlayer; //need to add a fix for when a player leaves the game
        gameList[gameID].sockets[joinID] = ws;

        let message = {
          type: 'PLAYER_JOIN_UPDATE',
          player: newPlayer
        }
        broadcastToGame(gameID, message);

      }else{
        console.log("Yo somethings up in gameLobby fam!!!!!?")
      }
    }else {
      console.log("Yo what game you tryna join guy?")
    }
  }

  function leaveGame(data){
    let gameID = data.gameID;
    let joinID =  data.joinID;

    let message = {
      type: 'PLAYER_REMOVE_UPDATE',
      joinID: joinID
    }

    /*Delete the player and socket from the list of players*/
    delete gameList[gameID].players[joinID];
    delete gameList[gameID].sockets[joinID];

    broadcastToGame(gameID, message)
  }

  function broadcastToGame(gameID, message){
    message = JSON.stringify(message);
    
    for (let playerID in gameList[gameID].sockets){
      let client = gameList[gameID].sockets[playerID];

      /*Check if the client socket is open*/
      if(client.readyState === client.OPEN){
        client.send(message);
      }else{
        console.error('Player ', playerID, ' is not ready to get messages');
      }
    }
  }

  this.makeGame = function(){
    //idea to fix players leaving:
        //decrease capacity and use it as a way to tell how many players can join
        //rename numPlayers (already did) to next id or something like that so that it assigns an id 
        //for the next player
    gameNumber+=1;
    gameList[gameNumber] = {
      id: this.numgameList,
      capacity: 6,
      playerNumber: 0,
      players: {},
      sockets: {}
    };
  }

  function makeUser(data, joinID, gameID){
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

  function uMove(data){//temp
    gameList[data.gameID].players[data.playerID].x = data.x;
    gameList[data.gameID].players[data.playerID].y = data.y;
    gameList[data.gameID].players[data.playerID].angle = data.angle;
    gameList[data.gameID].players[data.playerID].rotation = data.rotation;
  }
}

/*Singleton Design Pattern*/
let instance;

const socketServer = function(ws){
  if (!instance){
    instance = new ServerWebsocket();
    instance.makeGame();
  }
  
  instance.serveClient(ws);
}

export default socketServer;