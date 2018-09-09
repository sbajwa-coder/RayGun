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
}

gameScene.create = function(){


	/****Right Side****/
	let rightarm = this.add.container(-65,-7);
	let rightlowerarm = this.add.container(1,3);

	let right_shoulder = this.add.image(0,0,'key',"parts_right-shoulder.png");
	let right_upperarm = this.add.image(10,10,'key',"parts_right-upperarm.png").setOrigin(1,0).setAngle(20);
	let right_forearm  = this.add.image(-13,40,'key',"parts_right-forearm.png").setOrigin(0.5,0.5);
	let right_hand     = this.add.image(-10,50,'key',"parts_right-hand.png").setOrigin(0.5,0);
	let sword 		   = this.add.image(10,112,'key',"parts_sword.png").setAngle(-20);

	rightlowerarm.add([sword,right_hand, right_forearm]);
	rightlowerarm.setDepth(1);

	rightarm.add([rightlowerarm,right_upperarm,right_shoulder]);
	rightarm.setDepth(2);

	/****Left Side****/
	let leftarm = this.add.container(70, -7);
	let leftlowerarm = this.add.container(1,3);

	let left_shoulder = this.add.image(0,0,'key',"parts_left-shoulder.png");
	let left_upperarm = this.add.image(10,5,'key',"parts_left-upperarm.png").setOrigin(1,0).setAngle(-20);
	let left_forearm  = this.add.image(8,40,'key',"parts_left-forearm.png").setOrigin(0.5,0.5);
	let left_hand     = this.add.image(5,50,'key',"parts_left-hand.png").setOrigin(0.5,0);
	let shield    	  = this.add.image(15,30,'key',"parts_shield.png").setAngle(25);

	leftlowerarm.add([left_hand, left_forearm, shield]);
	leftlowerarm.setDepth(1);

	leftarm.add([leftlowerarm,left_upperarm,left_shoulder]);
	leftarm.setDepth(2);


	/****MIDDLE****/
	let upperbody = this.add.container(400,300);
	let torso = this.add.image(0,0,'key',"parts_torso.png");
	upperbody.add([torso,leftarm,rightarm]);
	//upperbody.setSize(128,64);
	// this.matter.add.gameObject(upperbody);

	/****LEFT LEG****/
	let rightleg = this.add.container(220,300);
	let right_thigh = this.add.image(0,0,'key',"parts_right-thigh.png");
	let right_shin = this.add.image(0,10,'key',"parts_right-shin.png");
	let right_foot  = this.add.image(0,30,'key',"parts_right-foot.png");

	rightleg.add([right_foot,right_shin,right_thigh]).setAngle(15);

	/****LEFT LEG****/
	let leftleg = this.add.container(280,300);
	let left_thigh = this.add.image(0,0,'key',"parts_left-thigh.png");
	let left_shin = this.add.image(0,10,'key',"parts_left-shin.png");
	let left_foot  = this.add.image(0,30,'key',"parts_left-foot.png");

	leftleg.add([left_foot,left_shin,left_thigh]).setAngle(-15);

	let lowerbody = this.add.container(150,20);
	lowerbody.add([leftleg,rightleg]);

	/****FINAL****/
	let warrior = this.add.container(100,100);
	let head = this.add.image(400,280,'key','parts_head.png');
	warrior.add([lowerbody,upperbody/*,rightarm,leftarm*/, head]);
	/*warrior.setSize(128,64);
	this.matter.add.gameObject(warrior);*/
	//rightarm.add(rightlowerarm);

	// container = this.add.container(100, 100, [torso ]);

 //    //  A Container has a default size of 0x0, so we need to give it a size before enabling a physics body
 //    container.setSize(128, 64);

 //    var physicsContainer = this.matter.add.gameObject(container);
	
	// var container1 = this.add.container(100, 100);
 //    var container2 = this.add.container(100, 100);

 //    container1.add([container2,right_upperarm,right_shoulder]);
 //    container2.add([right_hand,right_forearm]);

 	var self = this;
	 tweendata = {
        targets: [upperbody],
        angle: 35,
        duration: 500,
        yoyo:true,
        ease: "inout",
        onComplete: function(){self.tweens.add(tweendata2)}
    }

      tweendata2 = {
        targets: [upperbody],
        angle: -35,
        duration: 500,
        yoyo:true,
        ease: "inout"}

       tweendata3 = {
       	targets: [leftleg],
        angle: ,
        duration: 500,
        yoyo:true,
        ease: "inout",
        onComplete: function(){self.tweens.add(tweendata2)}
       }
   
     this.tweens.add(tweendata);
     //this.tweens.add(tweendata2);
}



/*entire body (main group):
    head (lowest level),
    torso and arms group:
            torso (lowest level),
            left arm:
                   shoulder (lowest level),
                   upperarm (lowest level),
                   lowerarm:
                           forearm (lowest level),
                           hand (lowest level),
                           shield (lowest level)
            right arm:
                   shoulder (lowest level),
                   upperarm (lowest level),
                   lowerarm:
                           forearm (lowest level),
                           hand (lowest level),
                           weapon (lowest level)
    legs group:
            left leg:
                      thigh (lowest level),
                      shin (lowest level),
                      foot (lowest level),
             right leg:
                      thigh (lowest level),
                      shin (lowest level),
                      foot (lowest level),*/


 	/*let right_shoulder = this.add.image(0,0,'key',"parts_right-shoulder.png");//.setDepth(2);//.setScale(5);
	let right_upperarm = this.add.image(10,10,'key',"parts_right-upperarm.png").setOrigin(1,0).setAngle(20);//.setDepth(3);//.setAngle(45);//.setScale(5);
	let right_forearm  = this.add.image(-13,40,'key',"parts_right-forearm.png").setOrigin(0.5,0.5);//.setDepth(0);//.setScale(5);
	let right_hand     = this.add.image(-10,50,'key',"parts_right-hand.png").setOrigin(0.5,0);//.setDepth(-1);//.setScale(5);


    tweendata = {
        targets: warrior,
        x: 512,
        duration: 1000,
        yoyo:true,
        ease: "Cubic.easeIn"}

	warrior.add([right_hand,right_forearm,right_upperarm,right_shoulder]);//,right_forearm,right_hand]);
	//warrior.addAt([right_forearm,right_hand],10);4
	    tw = this.tweens.add(tweendata);*/


	    /*
	    rightlowerarm.add([right_hand, right_forearm]);
	//rightlowerarm.parentContainer = rightarm;
	rightlowerarm.setDepth(1);

	rightarm.add([rightlowerarm,right_upperarm,right_shoulder]);
	rightarm.setDepth(2);
	//rightarm.add(rightlowerarm);
	
	// var container1 = this.add.container(100, 100);
 //    var container2 = this.add.container(100, 100);

 //    container1.add([container2,right_upperarm,right_shoulder]);
 //    container2.add([right_hand,right_forearm]);

	 // tweendata = {
  //       targets: rightarm,
  //       x: 512,
  //       duration: 1000,
  //       yoyo:true,
  //       ease: "Cubic.easeIn"}

  //    this.tweens.add(tweendata);
*/