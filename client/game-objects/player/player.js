import warrior from '../characters/warriorModel.js'

function Player(id, username){
	this.id = id;
	this.username = username;
	this.character = warrior();
	this.team = 'none';
	this.status = 'lobby';
	this.gameID = 0;
	this.inGameID = 0;
}

Player.prototype.joinLobby = function(gameID, inGameID){
	this.gameID = gameID;
	this.inGameID = inGameID;
	this.status = 'gameLobby';
}

Player.prototype.leaveLobby = function(){
	this.gameID = 0;
	this.inGameID = 0;
	this.status = 'lobby';
	this.team = 'none';
}

Player.prototype.changeTeam = function(team){
	this.team = team;
}

Player.prototype.changeCharacter = function(chracter){
	this.character = character //figure our how to change characters, array?
}

export default Player;