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

gameScene.init = function(){
	this.playerspeed = 5;
}

gameScene.preload = function(){
	//this.load.multiatlas('guy','assets/walking.json','assets'); <- loading atlas
	this.load.atlas('zombie','assets/spritesheet.png', 'assets/spritesheet.json');
	this.load.image('background','assets/map.png');
	this.load.json('shape','assets/zombieShape.json');
}

gameScene.create = function(){
	var box = this.cache.json.get('shape');
	
	//Player stuff
	this.player = this.matter.add.sprite(150,250,'zombie',
		'tile015.png',{shape:box.tile015});
	this.player.setScale(2,2);
	this.player.speed = 5;

	this.anims.create({
		key: 'walk',
		frames: this.anims.generateFrameNames('zombie', {
			frames: ['tile015.png','tile016.png','tile017.png',
					'tile018.png','tile020.png','tile021.png',
					'tile022.png','tile023.png']
		}),
		frameRate: 15,
		repeat:-1,
		//onUpdate: animUpdateCallback
	});
	cursor = this.input.keyboard.createCursorKeys();

	let bg = this.add.image(0,0,'background').setOrigin(0,0).setDepth(-1);
	this.matter.world.setBounds(0,0,bg.width,bg.height);
	console.log(bg);
	this.cameras.main.startFollow(this.player);
	this.cameras.main.setBounds(0,0,bg.width,bg.height);
		
}


gameScene.update = function(){
	//Player movement update
	if (cursor.left.isDown){
		this.player.x -= (this.player.speed);
		this.player.rotation = (90*(Math.PI/180))
		this.player.anims.play('walk',true);
		//this.player.x -= this.playerspeed;
	}
	else if (cursor.right.isDown){	
		this.player.x += (this.player.speed);
		this.player.anims.play('walk',true);
		this.player.rotation = (-90*(Math.PI/180))
		//this.player.x += this.playerspeed;
	}

	if (cursor.up.isDown){
		this.player.y -= (this.player.speed);
		this.player.anims.play('walk',true);
		this.player.rotation = (180*(Math.PI/180))
		//this.player.y -= this.playerspeed;
	}
	else if (cursor.down.isDown){
		//this.player.y += this.playerspeed;
		this.player.y += (this.player.speed);
		this.player.rotation = (0*(Math.PI/180))
		this.player.anims.play('walk',true);
	}
}