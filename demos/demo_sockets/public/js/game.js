let config = {
	type: Phaser.AUTO,
	height: 600,
	width:800,
	scene: {
		preload: preload,
		create: create,
		update: update
		},
	physics: {
		default: 'matter',
		matter: {
			debug:true,
			setBounds: {
				width: 800,
				height: 600
			},
			gravity: {
				y:0
			}
		}
	}
};


let game = new Phaser.Game(config);

function preload(){

}

function create(){
	this.socket = io();
}

function update(){

}