import character from './baseModel.js';

var warriorSpritesheet = '../../assets/sprites/character/warrior/cur/run/spritesheet.png';
var warriorSpriteData = '../../assets/sprites/character/warrior/cur/run/spritesheet.json';

function Warrior(){
	return new character('warrior',warriorSpritesheet,warriorSpriteData); //for now just return a new instance of character
}

export default Warrior;