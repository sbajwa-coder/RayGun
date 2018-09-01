import warrior from '../characters/warriorModel.js'

function Player(id, username){
	this.id = id;
	this.username = username;
	this.character = new warrior();
	this.status = 'LOBBY';

	this.team = 'none';
	this.gameID = 0;
	this.joinID = 0;

	this.x = 0;
	this.y = 0;
	this.angle = 0;
	this.rotation = 0;
}

Player.prototype.joinLobby = function(gameID, joinID){
	this.gameID = gameID;
	this.joinID = joinID;
	this.status = 'GAME_LOBBY';
}

Player.prototype.leaveLobby = function(){
	this.gameID = 0;
	this.joinID = 0;
	this.status = 'GAME_LOBBY';
	this.team = 'none';
}

Player.prototype.changeTeam = function(team){
	this.team = team;
}

Player.prototype.changeCharacter = function(chracter){
	this.character = character //figure our how to change characters, array?
}

export default Player;