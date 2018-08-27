const frameRate = 30
const repeat = -1

function characterAnims(scene){
	/*Warrior Walk*/
	let frames = scene.anims.generateFrameNames('warrior', { 
		start: 0, end: 15, zeroPad: 3, prefix: 'tile', suffix: '.png' });
	let animsConfig = {
		key: 'warriorWalk',
		frames,
		frameRate,
		repeat,
	}
	scene.anims.create(animsConfig);

	/*Warrior Backwards Walk*/
	frames = scene.anims.generateFrameNames('warrior', { 
		start: 0, end: 15, zeroPad: 3, prefix: 'tile', suffix: '.png' }).reverse();
	animsConfig.key = "warriorBackwardsWalk";
	animsConfig.frames = frames;
	scene.anims.create(animsConfig);

	/*Warrior Attack*/
	frames = scene.anims.generateFrameNames('warrior_attack', { 
		start: 0, end: 11, zeroPad: 3, prefix: 'tile', suffix: '.png' });
	animsConfig.key = "warriorAttack";
	animsConfig.frames = frames;
	animsConfig.repeat = 0;
	scene.anims.create(animsConfig);


}

export default characterAnims;