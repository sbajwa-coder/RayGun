import character from './baseModel.js';

function Warrior(){
	character.call(this,'CHAR_WARRIOR');
}

Warrior.prototype = Object.create(character.prototype);

export default Warrior;

/*'WARRIOR'

"CHAR_WARRIOR"
"CHAR_BOWMAN"
"CHAR_MAGE"

"MODEL_WARRIOR"
"MODEL_MAGE"

"WARRIOR_CHAR"
"MAGE_CHAR"*/