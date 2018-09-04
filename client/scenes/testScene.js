class TestScene extends Phaser.Scene{
	constructor(test){
		super({
			key: 'testScene'
		});
	}

	init(data){
		this.client = data.client;
		this.players = data.players;
	}

	preload(){
		this.load.image('testimg', '/assets/menu.png');
		this.load.atlas('CHAR_WARRIOR', '/assets/sprites/characters/warrior/cur/run/spritesheet.png',
			'/assets/sprites/characters/warrior/cur/run/spritesheet.json');
	}

	create(){
		// let x = this.add.image(0,0,'testimg').setOrigin(0,0).setScale(0.1,0.1).setInteractive({ cursor: 'pointer' });
		// x.on('pointerdown', function(){
		// 	this.scene.scene.remove()
		// });
		let self = this;
		let style = {
	        fontSize: '24px',
	        fontFamily: 'Arial',
	        color: '#ffffff',
	        backgroundColor: '#ff00ff'
	    };
		//this.add.image(400,300,"testimg");

		/*for (let key in this.players){
			let u = self.add.text(0,0,this.players[key].username,  { fill: '#0f0' });
			let i = self.add.image(50,50,'CHAR_WARRIOR','tile000.png');
			self.add.container(100,100,[u,i]);
		}*/

		let cont;
		const x = this.add.text(50, 100, 'Change map', style).setPadding(16);
    	x.setInteractive();
    	x.on('pointerdown', function(pointer){
    		if (cont){
    			console.log('not');
    			cont.destroy();
    			cont=null;
    		}else{
    			console.log('enter');
    			let te = self.add.text(0,0,'MAP_TEMPLATE',  { fill: '#0f0' });
    			let im = self.add.image(0,50, 'testimg').setOrigin(0.5,0).setScale(0.5);

	    		cont = self.add.container(500,100,[te, im]);
    		}
		});

    	const z = this.add.text(50, 200, 'Change mode', style).setPadding(16);
    	z.setInteractive();

    	let cont2;
    	const y = this.add.text(50, 300, 'Player list',  style).setPadding(16);
    	y.setInteractive();
    	y.on('pointerdown', function(pointer){
    		if (cont2){
	    			cont2.destroy();
	    			cont2 = null;
	    	}else{

	    		let x = 300;
	    		let y = 100;

		    	for (let key in self.players){
		    		
	    			let u = self.add.text(0,0,self.players[key].username,  { fill: '#0f0' });
					let i = self.add.image(50,50,'CHAR_WARRIOR','tile000.png');
					cont2 = self.add.container(x,y,[u,i]);
					x+=150;

					if (x=600){
						x = 300;
						y+= 100;
					}
		
				}
	    	}

		});

    	/*const a = this.add.text(50, 400, 'change team', { fill: '#0f0' });
    	a.setInteractive();*/

    	const w = this.add.text(50, 400, 'Exit', style).setPadding(16);
    	w.setInteractive();
    	w.on('pointerdown', function(pointer){
	    	self.scene.stop();
		});
		console.log('active')
	}
}

export default TestScene;