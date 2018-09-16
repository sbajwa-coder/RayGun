import fullbody from './parts/fullbody.js'
let gameScene = new Phaser.Scene('game');

let config = {
	type: Phaser.AUTO,
	width: 800,
	height: 600,
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
	},
	scene: gameScene
};

let game = new Phaser.Game(config);

gameScene.preload = function(){
  this.load.atlas('key', './spritesheet.png', './spritesheet.json');
  this.load.json('partsConfig', './config.json');
}

gameScene.create = function(){
  let x = this.add.container(100,100);
  x.add([new fullbody(this, 0, 0)]);
//  console.log(scene.cache.json.get('partsConfig'));

  // let newChar = new fullbody(this,0,0);
}