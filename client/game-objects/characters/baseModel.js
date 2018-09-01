const MIN_DAMAGE = 1;
const OVER_HEAL = 1.2;

function Character(model){
	this.key = model;

	this.stats = {HP:100};

	this.maxHP = 100;
	this.maxMP = 100;
	this.HP = this.maxHP;
	this.MP = this.maxMP;

	this.mass = 100; //what value
	this.defense = 100;
	this.meleeGuard = 0.5;
	this.magicGuard = 0.25;
	this.rangeGuard = 0.25;

	this.attackPower = 100;
	this.attackSpeed = 5;
	this.movementSpeed = 5;
}

/***********************Setters***********************/
/*Stats based*/
Character.prototype.heal = function(health){
	let recover = this.HP + health;
	if (recover > (this.maxHP * OVER_HEAL)) recover = this.maxHP;
	
	this.HP = recover;
}

Character.prototype.takeDamage = function(attack){
	let guard = this.meleeGuard;

	if (attack.type === 'MAGIC'){
		guard = this.magicGuard;
	}else if (attack.type === 'RANGE'){
		guard = this.rangeGuard;
	}

	//let damage = attack.damage - (((defense*guard)/100)*attack.damage)
	let damage = attack.damage-(this.defense * this.guard);
	if (damage < MIN_DAMAGE) damage = MIN_DAMAGE;

	this.HP -= damage;
}

Character.prototype.useMana = function(mana){
	let consume = this.MP - mana
	if (consume < 0) consume = 0;

	this.MP = consume;
}

Character.prototype.recoverMana = function(mana){
	let recover = this.MP + mana;
	if (recover > this.maxMP) recover = this.maxMP;

	this.MP = recover;
}

/***********************Getters***********************/
Character.prototype.getKey = function(){
	return this.key;
}

/*Stats based*/
Character.prototype.getHP = function(){
	return this.HP;
}

Character.prototype.getMP = function(){
	return this.MP;
}

export default Character;