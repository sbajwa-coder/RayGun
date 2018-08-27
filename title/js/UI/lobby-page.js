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

function FilterParameters() {
	this.noPass = false;
	this.gameMode = "any";


	this.setRows = function() {
		let rowsToShow = filterParameters.getRowsToShow();
		$(".room-list-row").css("display", "none");
		for (row of rowsToShow) {
			row.css("display", "block");
		}
	}

	this.changeNoPass = function() {
		this.noPass = !this.noPass;
		this.setRows();
	}

	this.changeGameMode = function(gameMode) {
		if (this.gameMode != gameMode) {
			this.gameMode = gameMode
			this.setRows();
		}
	}

	this.getRowsToX = function(x) {
		let rows = [];
		let rows2 = [];
		for (item of $(".room-list-row")) {
			let row = $(item);
			let locked = row.children(".locked").children('.lock-icon');
			let gameMode = row.children(".game-mode").html();

			const noPassCondition = this.noPass == false || locked.hasClass('lock-on') == !this.noPass;
			const gameModeCondition = gameMode == this.gameMode || 
										this.gameMode == "any" || this.gameMode == "mode";

			if (noPassCondition && gameModeCondition) {
				rows.push(row);
			} else {
				rows2.push(row);
			}
		}
		if (x) return rows;
		return rows2;
	}

	this.getRowsToShow = function() {
		return this.getRowsToX(true);
	}

	this.getRowsToHide = function() {
		return this.getRowsToX(false);
	}
}

var filterParameters = new FilterParameters();

// FILTER SYSTEM ==========================
$(".filter-no-pass").click(function(event) {
	/* Act on the event */

	// no pass selected ---------------
	// remove rows with locked
	if ($(this).hasClass('no-pass-unselected')) {
		$(this).removeClass('no-pass-unselected');
		$("#noPassCheck").attr('src', '../assets/UI/checked-icon.png');
		filterParameters.changeNoPass();
		
	} else {
		// no pass deselected
		$(this).addClass('no-pass-unselected');
		$("#noPassCheck").attr('src', '../assets/UI/unchecked-icon.png');
		filterParameters.changeNoPass();
	}
});

// filter mode dropdown display
$(".filter-mode").click(function(event) {
	/* Act on the event */
	if ($(".mode-dropdown").css("display") == "block") {
		$(".mode-dropdown").css("display", "none");
	} else {
		$(".mode-dropdown").css("display", "block");
	}
});

// mode dropdown selection
$(".mode-item").click(function(event) {
	/* Act on the event */
	let filterMode = $(".filter-mode");

	filterParameters.changeGameMode($(this).html());

	if ($(this).html() == "any") {
		filterMode.html("mode");
	} else {
		filterMode.html($(this).html());
	}
	$(".selected-mode").removeClass('selected-mode');
	$(this).addClass('selected-mode');
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