import gameLobbyFunction from './utils/lobbyServerFunctions.js';

function ServerWebsocket(){
  this.gameList = {};
  this.gameNumber = 0;
  let lobbyFunction = new gameLobbyFunction(this);

  this.serveClient = function(ws){
    let self = this;
    ws.on('message', function(message) {
      let data = JSON.parse(message);

      switch (data.type) {
        case 'WORLD_CREATE':
          console.log('make');
          lobbyFunction.makeGame();
          break;
          
        case 'WORLD_CONNECT':
          console.log('join');
          lobbyFunction.joinGame(ws,data);
          break;

        case 'WORLD_DISCONNECT':
          console.log('leave');
          lobbyFunction.leaveGame(data);
          break;

        case 'PLAYER_MOVE':
          console.log('move');
          //need to update server x y and angle
          self.broadcastToGame(data.gameID, data);
          break;

        case 'SERVER_MOVE':
          lobbyFunction.movementUpdate(data);
          break;

        default:
          break;
      }
    });
  }

  this.sendMessage = function(ws, data){
    ws.send(JSON.stringify(data));
  }

  this.broadcastToGame = function(gameID, message){
    message = JSON.stringify(message);
    
    for (let playerID in this.gameList[gameID].sockets){
      let client = this.gameList[gameID].sockets[playerID];

      /*Check if the client socket is open*/
      if(client.readyState === client.OPEN){
        client.send(message);
      }else{
        console.error('Player ', playerID, ' is not ready to get messages');
      }
    }
  }

  /**temp stuff**/
  this.makeGame = function(){
    lobbyFunction.createGame();
  }
}

/*Singleton Design Pattern*/
let instance;

const socketServer = function(ws){
  if (!instance){
    instance = new ServerWebsocket();
    instance.makeGame(); //temp
  }
  
  instance.serveClient(ws);
}

export default socketServer;