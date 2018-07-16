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

	this.load.json('shape','assets/zombieShape.json');
}

gameScene.create = function(){
	var box = this.cache.json.get('shape');
	
	this.player = this.matter.add.sprite(150,250,'zombie',
		'tile015.png',{shape:box.tile015});
	this.player.setScale(2,2);
	this.player.speed = 5;

	//prefix (naming convention) for atlax
	//this.anims.create({ key: 'jellyfish', frames: this.anims.generateFrameNames('sea', { prefix: 'blueJellyfish', end: 32, zeroPad: 4 }), repeat: -1 });
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

	this.anims.create({
		key: 'attack',
		frames: this.anims.generateFrameNames('zombie', {
			frames: ['tile025.png','tile026.png','tile027.png',
					'tile030.png','tile031.png','tile032.png',
					'tile033png','tile034.png', 'tile015.png']
		}),
		frameRate: 15,
		repeat:-1,
		//onUpdate: animUpdateCallback
	});
	this.player.anims.play('walk');

	this.player.on('animationupdate',animUpdate,this);

	this.attack = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Z);
	cursor = this.input.keyboard.createCursorKeys();
}

function animUpdate(animation,frame){
	box = this.cache.json.get('shape');
	currFrame = frame.textureFrame.split('.')[0];
	this.player.setBody(box[currFrame]);
	this.player.setScale(2,2);
}
function animUpdateCallback ()
{
    console.log(1);
}


gameScene.update = function(){
	if (this.attack.isDown){
		this.player.anims.play('attack',true);
	}
	//Player movement update
	if (cursor.left.isDown){
		this.player.x -= (this.player.speed);
		this.player.anims.play('walk');
		//this.player.x -= this.playerspeed;
	}
	else if (cursor.right.isDown){
		this.player.x += (this.player.speed);
		this.player.anims.play('walk');
		//this.player.x += this.playerspeed;
	}

	if (cursor.up.isDown){
		this.player.y -= (this.player.speed);
		this.player.anims.play('walk');
		//this.player.y -= this.playerspeed;
	}
	else if (cursor.down.isDown){
		//this.player.y += this.playerspeed;
		this.player.y += (this.player.speed);
		this.player.anims.play('walk');
	}
}