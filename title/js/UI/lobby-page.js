// const ps = new PerfectScrollbar('#abc', {
//   wheelSpeed: 2,
//   wheelPropagation: true,
//   minScrollbarLength: 20
// });
// console.log(ps);

$(".modal-screen").css("display", "block");
$(".modal-screen").animate({"opacity": "0.5"}, 200);

$(".logout-button").click(function(event) {
	/* Act on the event */
	if ($(this).attr("disabled")) return false;
	
	const message = "Logging Out ...";
	shockAlert(message, message.length+40, 20, -15, $(this), function () {
		console.log('logout complete');
	});
});

$(".room-list-row").click(function(event) {
	/* Act on the event */
	$(".room-list-row").removeClass('selected-room');
	$(this).addClass('selected-room');
	let joinButtonImage = $('.join-button > img.button-image2');
	joinButtonImage.attr("src", "../../assets/UI/join-button.png");
	joinButtonImage.parent("div").removeClass('disabled-button');
});

$(".join-button").click(function(event) {
	/* Act on the event */
	if(!($(this).hasClass('disabled-button'))) {
		const message = "Joining Game ...";
		for (child of $(".selected-room").children()) {
			console.log(child.innerHTML);
		}
		shockAlert(message, message.length+40, 20, -15, $(this), function () {
			console.log('game join complete');
		});
	}
});

$(".refresh-button").click(function(event) {
	/* Act on the event */
	console.log('refreshing');
});