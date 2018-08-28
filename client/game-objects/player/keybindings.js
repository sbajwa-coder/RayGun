const BUTTON_ATTACK = 'Z';
const BUTTON_UP = 'UP';
const BUTTON_DOWN = 'DOWN';
const BUTTON_LEFT = 'LEFT';
const BUTTON_RIGHT = 'RIGHT';

function Keybindings(scene){
	const input = scene.input.keyboard;
	const keyCodes = Phaser.Input.Keyboard.KeyCodes;

	return {
		attack: input.addKey(keyCodes[BUTTON_ATTACK]),
		up: input.addKey(keyCodes[BUTTON_UP]),
		down: input.addKey(keyCodes[BUTTON_DOWN]),
		left: input.addKey(keyCodes[BUTTON_LEFT]),
		right: input.addKey(keyCodes[BUTTON_RIGHT])
	}
}

export default Keybindings;