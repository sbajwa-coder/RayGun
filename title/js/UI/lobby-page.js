// const ps = new PerfectScrollbar('#abc', {
//   wheelSpeed: 2,
//   wheelPropagation: true,
//   minScrollbarLength: 20
// });
// console.log(ps);

//$(".modal-screen").css({"display": "block","opacity": "0.5"});

// OFF-CLICK ========================
$(document).click(function(event) {
	/* Act on the event */
	let modeDropDown = $(".mode-dropdown");
	if (!$(event.target).hasClass('filter-mode')) {
		modeDropDown.css("display", "none");
	}
});

// FILTER SYSTEM ==========================
$(".filter-no-pass").click(function(event) {
	/* Act on the event */
	if ($(this).hasClass('no-pass-unselected')) {
		$(this).removeClass('no-pass-unselected');
		$("#noPassCheck").attr('src', '../assets/UI/checked-icon.png');
	} else {
		$(this).addClass('no-pass-unselected');
		$("#noPassCheck").attr('src', '../assets/UI/unchecked-icon.png');
	}
});

$(".filter-mode").click(function(event) {
	/* Act on the event */
	if ($(".mode-dropdown").css("display") == "block") {
		$(".mode-dropdown").css("display", "none");
	} else {
		$(".mode-dropdown").css("display", "block");
	}
});

$(".mode-item").click(function(event) {
	/* Act on the event */
	console.log($(this).html());
});


// LOGOUT ============================
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