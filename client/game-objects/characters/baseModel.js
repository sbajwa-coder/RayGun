const MIN_DAMAGE = 1;
const OVER_HEAL = 1.2;

function Character(model){
	this.key = model;

	this.stats = {
		maxHP: 100,
		maxMP: 100,
		HP: this.maxHP,
		MP: this.maxMP,

		mass: 100, //what value
		defense: 100,
		meleeGuard: 0.5,
		magicGuard: 0.25,
		rangeGuard: 0.25,

		attackPower: 100,
		attackSpeed: 5,
		movementSpeed: 5,
		angleSpeed: 5,
		backwardSpeed: 0.5
	}
}

/***********************Setters***********************/
/*Stats based*/
Character.prototype.heal = function(health){
	let recover = this.stats.HP + health;
	if (recover > (this.stats.maxHP * OVER_HEAL)) recover = this.stats.maxHP;
	
	this.stats.HP = recover;
}

Character.prototype.takeDamage = function(attack){
	let guard = this.stats.meleeGuard;

	if (attack.type === 'MAGIC'){
		guard = this.stats.magicGuard;
	}else if (attack.type === 'RANGE'){
		guard = this.stats.rangeGuard;
	}

	//let damage = attack.damage - (((defense*guard)/100)*attack.damage)
	let damage = attack.damage-(this.stats.defense * this.stats.guard);
	if (damage < MIN_DAMAGE) damage = MIN_DAMAGE;

	this.stats.HP -= damage;
}

Character.prototype.useMana = function(mana){
	let consume = this.stats.MP - mana
	if (consume < 0) consume = 0;

	this.stats.MP = consume;
}

Character.prototype.recoverMana = function(mana){
	let recover = this.stats.MP + mana;
	if (recover > this.stats.maxMP) recover = this.stats.maxMP;

	this.stats.MP = recover;
}

/***********************Getters***********************/
Character.prototype.getKey = function(){
	return this.key;
}

/*Stats based*/
Character.prototype.getHP = function(){
	return this.stats.HP;
}

Character.prototype.getMP = function(){
	return this.stats.MP;
}

export default Character;