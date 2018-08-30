function Character(model, spritesheet, spriteData, startImage){
	/*Info about the model*/
	this.model = model; //name of the model
	this.spritesheet = spritesheet;
	this.spriteData = spriteData;
	this.startImage = startImage || 'tile000.png';


	/*Stats*/
	this.str = 100; //see what kind of stats we need
	this.speed = 3;
	this.defense = 50;
	this.hp = 100;
	this.mp = 100;
	this.stam = 100; //see if we need this	
}

/***********************Setters***********************/
/*position based*/
Character.prototype.setX = function(x){
	this.x = x;
}

Character.prototype.setY = function(y){
	this.y = y;
}

Character.prototype.setAngle = function(angle){
	this.angle = angle;
}

/*Stats based*/
Character.prototype.heal = function(health){
	this.hp += health;
}

//need some math for damage
Character.prototype.takeDamage = function(hit){
	this.hp -= hit*(this.defense/100);
}

Character.prototype.useMana = function(consume){
	this.mp -= consume;
}

Character.prototype.recoverMana = function(recover){
	this.mp += recover;
}

Character.prototype.useStamina = function(consume){
	this.stam -= consume
}

Character.prototype.recoverStamina = function(recover){
	this.stam += recover
}

/***********************Getters***********************/
/*Model based*/
Character.prototype.getModel = function(){
	return this.model;
}

Character.prototype.getImage = function(){
	return this.image;
}

Character.prototype.getStartImage = function(){
	return this.startImage;
}

/*Position based*/
Character.prototype.getX = function(){
	return this.x;
}

Character.prototype.getY = function(){
	return this.y;
}

Character.prototype.getAngle = function(){
	return this.angle;
}

/*Stats based*/
Character.prototype.getHp = function(){
	return this.hp;
}

Character.prototype.getMP = function(){
	return this.mp
}

Character.prototype.getStamina = function(){
	return this.stam;
}

export default Character;