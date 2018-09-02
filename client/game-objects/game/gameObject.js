function gameObject(){
	this.gameID = 0;
	this.gameMode = 'FFA';
	this.gameMap = 'map_template';

	this.capacity = 0;
	this.playerNumber = 0;
	this.numberTeams = 0;
	this.teamCapacities = {};
	this.teamPlayers = {};

	this.players = {};
	this.sockets = {};

}

gameObject.prototype.joinGame = function(player, ws){
	let joinStatus = false;

	if (this.capacity > 0){
		let joinID = this.playerNumber +=1;

		player.joinLobby(this.gameID, joinID);
		this.capacity -= 1;

		this.players[joinID] = player;
		this.sockets[joinID] = ws;

		if (this.numberTeams > 0){
			this.joinTeam(player);
		}

		joinStatus = true;
	}

	return joinStatus;
}

gameObject.prototype.leaveGame = function(joinID){
    delete this.players[joinID];
    delete this.sockets[joinID];
    this.leaveTeam();
}

gameObject.prototype.joinTeam = function(player, teamName=null){
	let teamStatus = false;

	if (teamName){
		teamStatus = teamJoinHelper(player, teamName);
	}
	else{
		for (let key in this.teamCapacities){
			if (!teamStatus){
				teamStatus = teamJoinHelper(player, key);
			}
		}
	}

	return teamStatus;
}

gameObject.prototype.leaveTeam = function(player){
	//NOT IMPLEMENTED
}

gameObject.prototype.createTeam = function(teamName, capacity){
	let createStatus = false;

	if (! Object.hasOwnProperty(teamName) && capacity > 0){
		this.teamCapacities[teamName] = capacity;
		this.numberTeams += 1;
		createStatus = true;
	}
}

function teamJoinHelper(player, teamName){
	let teamStatus = false;

	if (this.teamCapacities[teamName] > 0){
		this.teamCapacities[teamName] -=1;
		this.teamPlayers[teamName] = player;
		player.changeTeam(teamName);
		teamStatus = true;
	}

	return teamStatus;
}

export default gameObject;