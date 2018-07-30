let gameScene = new Phaser.Scene('game');

let config = {
	type: Phaser.AUTO,
	height: 600,
	width:800,
	scene: gameScene,
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

gameScene.preload = function(){
	//this.load.image('background', 'assets/background.png');
	//this.load.json('map', 'layout/lay1.json');

	//this.load.image('tile0','assets/tile0.png');
	//this.load.image('grass','assets/grass.png');
	


	this.load.image('Overworld', 'layout/map2/Overworld.png');
	this.load.tilemapTiledJSON('layout','layout/map2/datamap.json');




	this.load.image('warrior'
		,'assets/warrior.png');

	this.load.atlas('war','assets/warriorBody.png','assets/warriorBody.json');
	this.load.json('body','assets/warriorShape.json');
	//Working
	/*this.load.image('Overworld', 'layout/map/Overworld.png');
	this.load.tilemapTiledJSON('layout','layout/map/datamap.json');
*/}

gameScene.create = function(){
	//background
	map = this.make.tilemap({key: 'layout'});
	tileset = map.addTilesetImage('Overworld');
	var layer = map.createDynamicLayer(0,tileset,0,0);
	var layer2 = map.createDynamicLayer(1,tileset,0,0);
	var layer3 = map.createDynamicLayer(2,tileset,0,0);

	layer.setCollisionFromCollisionGroup();
	layer2.setCollisionFromCollisionGroup();
	layer3.setCollisionFromCollisionGroup();

	this.matter.world.convertTilemapLayer(layer);
	this.matter.world.convertTilemapLayer(layer2);
	this.matter.world.convertTilemapLayer(layer3);

	//For objects y = mapHeight - tilesize - y;
	var log = map.createFromObjects('obj',26);
	log[0].setOrigin(0.5,-0.5);
	console.log(log);

	var shape = this.cache.json.get('body');

	//Main Player
	this.player = this.matter.add.sprite(150,400, 'war','warrior.png', {shape: shape.warrior});
	this.player.setScale(0.5,0.5);
	this.player.speed = 5;


	cursor = this.input.keyboard.createCursorKeys();
}
	//Working
/*	map = this.make.tilemap({key: 'layout'});
	tileset = map.addTilesetImage('Overworld');
	var layer = map.createDynamicLayer(0,tileset,0,0);
	var layer2 = map.createDynamicLayer(1,tileset,0,0);
	var layer2 = map.createDynamicLayer(2,tileset,0,0);*/




	//Get level data from json
//	this.level = this.cache.json.get('map');
	
	//Set the background from json
	//let bg = this.add.image(0,0,this.level.background);
	//bg.setOrigin(0,0);

	/*//Set spirite from json
	for (var i in this.level.sprite){
		i = this.level.sprite[i];
		this.add.sprite(i.x,i.y,i.image);
	}*/

/*	map = this.add.tilemap('layout');	
	tileset = this.map.addTilesetImage('layout/ground_tiles.png','gameTiles');
	backyardlayer = this.map.createLayer('backyard',tileset)*/

	gameScene.update = function(){

	//Player movement update
	if (cursor.left.isDown){
		this.player.x -= (this.player.speed);
		//this.player.x -= this.playerspeed;
	}
	else if (cursor.right.isDown){
		this.player.x += (this.player.speed);
		//this.player.x += this.playerspeed;
	}

	if (cursor.up.isDown){
		this.player.y -= (this.player.speed);
		//this.player.y -= this.playerspeed;
	}
	else if (cursor.down.isDown){
		//this.player.y += this.playerspeed;
		this.player.y += (this.player.speed);
	}
}