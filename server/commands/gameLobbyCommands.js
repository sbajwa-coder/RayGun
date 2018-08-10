class Lobby{
	static join(wss,client,data, id){
		var player = {
	    	x: Math.floor(Math.random()*700)+50,
	    	y: Math.floor(Math.random()*500)+50,
	    	angle: 0,
	    	hp: 300,
	    	mp: 300,
	    	team: (Math.floor(Math.random()*2)==0)? 'red':'blue',
	    	character: 'warrior',
	    	username: data.username,
	    	id: id
	    }

	    var send = {
	    	type: 'update',
	    	player: player
	    }
	    wss.broadcast(send);
	    return player;
	}

	static leave(wss,id){
		var send = {
	    	type: 'remove',
	    	id: id
	    }

		wss.broadcast(send);
	}

	static ready(wss,ws,player){
		var send = {
	    	type: 'ready',
	    	player: player
	    }
	    
		wss.broadcast(JSON.stringify(send));
	}
}

export default Lobby;