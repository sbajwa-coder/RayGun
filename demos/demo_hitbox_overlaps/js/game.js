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
	this.load.image('warrior'
		,'assets/warrior.png');

	this.load.atlas('war','assets/warriorBody.png','assets/warriorBody.json');
	this.load.json('body','assets/warriorShape.json');
}

gameScene.create = function(){
	var shape = this.cache.json.get('body');

	//Main Player
	this.player = this.matter.add.sprite(150,400, 'war','warrior.png', {shape: shape.warrior});
	this.player.setScale(2,2);
	this.player.speed = 5;
	this.player.power = 0.5;

	//Enemy Player
	this.enemy = this.matter.add.sprite(250,150, 'war','warrior.png', {shape: shape.warrior});
	this.enemy.setScale(2,2);
	this.enemy.speed = 5;
	this.enemy.power = 0.8;
	//this.enemy.setVelocity(0.01,0.01);
//	this.enemy.setFriction(25);
	this.enemy.tint = 0xa2ea42;


	this.matter.world.on('collisionstart',(event,bodyA,bodyB)=>{

		if (bodyA.parent===this.player.body){
			if (bodyA.label === 'sensor_sword'){
				this.enemy.tint = Math.random() * 0xffffff;
			}
		
		}
		if (bodyB.parent===this.player.body){
			if (bodyB.label === 'sensor_sword'){
				this.enemy.tint = Math.random() * 0xffffff;
			}
		
		}

		/*if(bodyA.label.split('_')[0] === 'body'){
			this.player.speed = 0.4;
		}else{
			this.player.speed = 5;
		}*/
	});

	/*console.log(shape.warrior.fixtures[0].label);
	console.log(this.player.body.parts);*/

	//Movement create
	this.input.on("pointermove",(event) =>{
		let mouse = event;
		this.player.rotation =
			Math.atan2(mouse.y-this.player.y, 
				mouse.x-this.player.x) - (90*(Math.PI/180));
	});

	this.input.on("pointerdown",(event)=>{
		let mouse = event;

		var tween = this.tweens.add({
			targets: this.player,
			y:mouse.y, 
			x:mouse.x,
			duration:250, 
			ease:'power1',
			yoyo: true
		});
	});

	cursor = this.input.keyboard.createCursorKeys();
	this.upButton = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
	this.leftButton = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
	this.downButton = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
	this.rightButton = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);


	this.enemymove = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Q);
	this.enemy.body.mass = 100000
	console.log(this.enemy);
}		

gameScene.update = function(){
	//Enemy movement update
	if (this.leftButton.isDown){
		this.enemy.x -= (this.enemy.speed) * this.enemy.power;
	}
	else if (this.rightButton.isDown){
		this.enemy.x += (this.enemy.speed) * this.enemy.power;
	}

	if (this.upButton.isDown){
		this.enemy.y -= (this.enemy.speed) * this.enemy.power;
	}
	else if (this.downButton.isDown){
		this.enemy.y += (this.enemy.speed) * this.enemy.power;
	}


	//Player movement update
	if (cursor.left.isDown){
		this.player.x -= (this.player.speed) * this.player.power;
		//this.player.x -= this.playerspeed;
	}
	else if (cursor.right.isDown){
		this.player.x += (this.player.speed) * this.player.power;
		//this.player.x += this.playerspeed;
	}

	if (cursor.up.isDown){
		this.player.y -= (this.player.speed) * this.player.power;
		//this.player.y -= this.playerspeed;
	}
	else if (cursor.down.isDown){
		//this.player.y += this.playerspeed;
		this.player.y += (this.player.speed) * this.player.power;
	}
}