function playerMovementFunction(data){


	let opposite = Math.sin(data.rotation) * 3; //change to player speed
	let adjacent = Math.cos(data.rotation) * 3;

	let x = data.x;
	let y = data.y;
	let angle = data.angle;

	switch (data.action) {
		case 'ArrowLeft':
			angle-=3;
			break;

		case 'ArrowRight':
			angle+=3;
			break;

		case 'ArrowUp':
			x -= opposite;
			y += adjacent;
			break;

		case 'ArrowDown':
			x += opposite * 0.5; //0.5 to decrease the speed
			y -= adjacent * 0.5;
			break;

		default:
			break;
	}

	return {x:x,y:y,angle:angle};
}