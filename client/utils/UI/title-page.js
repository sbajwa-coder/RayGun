function titlePageInteractions($, uiAnimations) {

var event1 = new CustomEvent("loginEvent");
var event2 = new CustomEvent("joinGameEvent");
var event3 = new CustomEvent("logoutEvent");

// MODAL OPENING ==========================
$(".modal-trigger").click(function(event) {
	/* Act on the event */
	console.log('modal opener clicked');
	let classList = $(this).attr("class").split(" ");
	let modalId = "";
	for (let item of classList) {
		const words = item.split("-");
		if (words[0] === "trigger") {
			modalId = words[1] + "Modal";
			console.log(modalId);
			break;
		}
	}

	let modal = $("#" + modalId);
	
	if (modal.hasClass('modal-hidden')) {

		uiAnimations.showModal(modal);

		let modalScreen = $(".modal-screen");
		uiAnimations.showModalScreen(modalScreen);
	}
});

// MODAL CLOSING ==============================
$(".modal-screen").add(".modal-close-icon").click(function(event) {
	/* Act on the event */
	if ($(this).attr("disabled")) return false;

	uiAnimations.hideModalScreen($(".modal-screen"));
	uiAnimations.hideModal($(".modal-showing"));
});


// ICON TOGGLE ============================
$("img.icon-cross").click(function(event) {
	/* Act on the event */
	const currentOpacity = $(this).css("opacity");

	if (currentOpacity == "0") {
		$(this).css("opacity", "1");
	} else {
		$(this).css("opacity", "0");
	}
});

// LOGIN CLICKED =========================
$(".login-modal-button").click(function(event) {
	/* Act on the event */
	if ($(this).attr("disabled")) return false;

	const message = "Logging In";
	shockAlert(message, message.length+40, 20, -15, $(this), function () {
		// change scene here
		//self.scene.start("Lobby");
		$("#titlePage").remove();
		document.dispatchEvent(event1);
	});
});


// SIGN UP CLICKED ==========================
$(".register-modal-button").click(function(event) {
	/* Act on the event */
	if ($(this).attr("disabled")) return false;

	const message = "Confirmation Email Sent";
	shockAlert(message, message.length+40, 20, -15, $(this));
});

// CUSTOM ALERT ========================
function shockAlert(message, width, height, yOffset, btn, callback=function(){}) {
	let alertBox = $('.alert-box');
	alertBox.text(message);
	alertBox.css({
		width: width + '%',
		height: height + '%',
		left: (100-width)/2 + '%',
		top: (100-height)/2 + yOffset + '%',
		display: 'block'
	});

	uiAnimations.showAlert(alertBox, btn, callback);
}





// LOBBY RELATED ------------------------------

// JOINING =======================
$(".join-button").click(function(event) {
	/* Act on the event */
	if(!($(this).hasClass('disabled-button'))) {
		const message = "Joining Game ...";
		for (let child of $(".selected-room").children()) {
			console.log(child.innerHTML);
		}
		shockAlert(message, message.length+40, 20, -15, $(this), function () {
			console.log('game join complete');
			$("#lobbyPage").remove();
			document.dispatchEvent(event2);
		});
	}
});

// LOGOUT ============================
$(".logout-button").click(function(event) {
	/* Act on the event */
	if ($(this).attr("disabled")) return false;
	
	const message = "Logging Out ...";
	shockAlert(message, message.length+40, 20, -15, $(this), function () {
		console.log('logout complete');
		$("#lobbyPage").remove();
		document.dispatchEvent(event3);
	});
});

}

export default titlePageInteractions;