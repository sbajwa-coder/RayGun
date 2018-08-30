// const ps = new PerfectScrollbar('#abc', {
//   wheelSpeed: 2,
//   wheelPropagation: true,
//   minScrollbarLength: 20
// });
// console.log(ps);

//$(".modal-screen").css({"display": "block","opacity": "0.5"});

function lobbyPageInteractions($, uiAnimations) {

// CREATE GAME INTERACTIONS ===============
function TextCarousel(values, back, forward, field, idx=0) {
	this.back = back;
	this.forward = forward;
	this.values = values;
	this.field = field;
	this.idx = idx;

	this.assignValue = function() {
		this.field.html(this.values[this.idx]);
	}

	this.wireArrow = function() {
		let backClick = function(event) {
			this.idx -= 1;
			if (this.idx < 0) {
				this.idx = this.values.length - 1;
			}
			this.assignValue();
		}

		let forwardClick = function(event) {
			this.idx += 1;
			if (this.idx >= this.values.length) {
				this.idx = 0;
			}
			this.assignValue();
		}
		this.back.click(backClick.bind(this));
		this.forward.click(forwardClick.bind(this));
	}

	this.wireValue = function() {

		let minusClick = function(event) {
			if (this.idx == this.values.length-1) {
				this.forward.css('background-image', 'url(../../assets/UI/plus-button.png)');
			}
			if(this.idx >= 1) {
				this.idx -= 1;
				this.assignValue();
				if (this.idx == 0) {
					this.back.css('background-image', 'url(../../assets/UI/minus-button-disabled.png)');
				}
			}
		}

		let plusClick = function(event) {
			if (this.idx == 0) {
				this.back.css('background-image', 'url(../../assets/UI/minus-button.png)');
			}
			if (this.idx < this.values.length-1) {
				this.idx += 1;
				this.assignValue();
				if (this.idx == this.values.length-1) {
					this.forward.css('background-image', 'url(../../assets/UI/plus-button-disabled.png)');
				}
			}
		}
		this.back.click(minusClick.bind(this));
		this.forward.click(plusClick.bind(this));
	}
}

// game mode carousel
var gameModes = ["FFA", "CTF", "TDM"];
var gameModeCarousel = new TextCarousel(gameModes, $("#gameModeCarousel .carousel-back"),
					$("#gameModeCarousel .carousel-forward"),
					$("#gameModeValue"));
gameModeCarousel.wireArrow();

// capacity carousel
var minCapacity = 2;
var maxCapacity = 10;
var capacities = [...Array(maxCapacity+1).keys()].slice(minCapacity, maxCapacity+1);

var capacityCarousel = new TextCarousel(capacities, $("#capacityCarousel .carousel-back"),
					$("#capacityCarousel .carousel-forward"),
					$("#capacityValue"), 4);
capacityCarousel.wireArrow();

// rank carousel
var ranks = ["Recruit", "Lieutenant", "Captain", "General"];

var rankCarousel = new TextCarousel(ranks, $("#rankCarousel .minus-button"),
					$("#rankCarousel .plus-button"), $("#rankValue"));
rankCarousel.wireValue();

// RADIO BUTTON SYSTEM -------
function RadioButtonSystem(buttons, current=null) {
	this.buttons = buttons;
	if (current == null) this.current = buttons[0];
	else this.current = current;

	this.wire = function() {
		for (let button of this.buttons) {
			let radioClick = function(btn) {
				/* Act on the event */
				let img1 = $(this.current).children('img');
				img1.attr('src','../assets/UI/radio-button-off.png');

				let img2 = $(btn).children("img");
				img2.attr('src','../assets/UI/radio-button-on.png');
				this.current = btn;
			}
			let binded = radioClick.bind(this);
			$(button).click(function() {

				binded($(this));
			});
		}
	}
}

var passwordRadioButtons = $("#passwordRadio > .radio-item");
var passwordRadio = new RadioButtonSystem(passwordRadioButtons);
passwordRadio.wire();

$("#noPassword").click(function(event) {
	/* Act on the event */ 
	$("#gamePassword").val("").addClass('disabled-input');
});

$("#yesPassword").click(function(event) {
	/* Act on the event */
	$("#gamePassword").removeClass('disabled-input');
});


// MAP CAROUSEL =========================
function ImageCarousel(images, back, forward, field, idx=0) {
	this.tc = new TextCarousel(images, back, forward, field, idx);
	this.back = this.tc.back;
	this.forward = this.tc.forward;
	this.images = images;
	this.values = images;
	this.field = this.tc.field;
	this.idx = this.tc.idx;

	this.assignValue = function() {
		const img = "url(../assets/UI/"+this.images[this.idx]+".png)";
		this.field.css("background-image", img);
	}

	this.wireArrow = this.tc.wireArrow;
}

var maps = ["SHOCKFORT", "PURPLE", "MAGICAL"];
var mapCarouselNames = new TextCarousel(maps,
$(".map-selection > .carousel-back"),
$(".map-selection > .carousel-forward"),
$("#mapSelectionName"));
mapCarouselNames.wireArrow();

var mapImages = ["shockfort-bg", "purple-sky", "magical-sky"];
var mapCarouselImages = new ImageCarousel(mapImages,
$(".map-selection > .carousel-back"),
$(".map-selection > .carousel-forward"),
$("#mapSelection"));
mapCarouselImages.wireArrow();

var mapCaptions = ["caption 1", "caption 2", "caption 3"];
var mapCarouselCaptions = new TextCarousel(mapCaptions,
$(".map-selection > .carousel-back"),
$(".map-selection > .carousel-forward"),
$("#mapCaption"));
mapCarouselCaptions.wireArrow();


// CREATE / CANCEL RESPONDERS ===========
$("#createCancel").click(function(event) {
	/* Act on the event */
	$(".modal-screen").trigger('click');
});

function GameMake(gameName, gameMode, capacity, password, minRank, map) {
	this.gameName = gameName;
	this.gameMode = gameMode;
	this.capacity = capacity;
	this.password = password;
	this.minRank = minRank;
	this.map = map;

	this.createRoomListEntry = function() {
		console.log(this.gameName);
		console.log(this.gameMode);
		console.log(this.capacity);
		console.log(this.password);
		console.log(this.minRank);
		console.log(this.map);

		const row = '<div class="room-list-row">' +
			'<span class="title">Game name ova here!</span>' +
			'<span class="player-count">9/10</span>' +
			'<span class="game-mode">FFA</span>' +
			'<span class="locked">' +
				'<img class="lock-icon" src="../assets/UI/unlocked-icon.png" alt="unlock">' +
			'</span>' +
		'</div>';

		console.log(row);
	}

	this.sendGameMake = function() {
		console.log('sending');
	}
}

$("#createConfirm").click(function(event) {
	/* Act on the event */
	const gameName = $("#gameName").val();
	const gameMode = $("#gameModeValue").html();
	const capacity = $("#capacityValue").html();
	const password = $("#gamePassword").val();
	const minRank = $("#rankValue").html();
	const map = $("#mapSelectionName").html();

	let gameMake = new GameMake(gameName, gameMode, capacity,
						 password, minRank, map);

	gameMake.createRoomListEntry();

});



// $("#gameModeCarousel .carousel-back").click(function(event) {
// 	/* Act on the event */

// });

// $("#gameModeCarousel .carousel-forward").click(function(event) {
// 	/* Act on the event */
	
// });


// PLAYER PREVIEW =====================
var characters = [
	{
		name: "design1",
		hp: 300,
		mp: 90
	},
	{
		name: "design2",
		hp: 400,
		mp: 100
	},
	{
		name: "design3",
		hp: 9999,
		mp: 9999
	}
];
var previewIdx = 0;

function assignPreviewInfo(idx) {
	const img = "url(../../assets/UI/"+characters[idx].name+".png)";
	$(".player-preview").css("background-image", img);
	$(".player-preview > .character-name").html(characters[idx].name);
	$("#hp").html(characters[idx].hp);
	$("#mp").html(characters[idx].mp);
}

$(".player-preview > .carousel-back").click(function(event) {
	/* Act on the event */
	previewIdx -= 1;
	if (previewIdx < 0) {
		previewIdx = characters.length -1;
	}
	assignPreviewInfo(previewIdx);
});

$(".player-preview > .carousel-forward").click(function(event) {
	/* Act on the event */
	previewIdx += 1;
	if (previewIdx >= characters.length) {
		previewIdx = 0;
	}
	assignPreviewInfo(previewIdx);
});

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
		for (let row of rowsToShow) {
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
		for (let item of $(".room-list-row")) {
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



$(".room-list-row").click(function(event) {
	/* Act on the event */
	$(".room-list-row").removeClass('selected-room');
	$(this).addClass('selected-room');
	let joinButtonImage = $('.join-button > img.button-image2');
	joinButtonImage.attr("src", "../../assets/UI/join-button.png");
	joinButtonImage.parent("div").removeClass('disabled-button');
});


$(".refresh-button").click(function(event) {
	/* Act on the event */
	console.log('refreshing');
});

}

export default lobbyPageInteractions;