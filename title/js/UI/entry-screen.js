$("form").disableAutoFill();

$(".modal-trigger").click(function(event) {
	/* Act on the event */
	let classList = $(this).attr("class").split(" ");
	let modalId = "";
	for (let item of classList) {
		const words = item.split("-");
		if (words[0] === "trigger") {
			modalId = words[1] + "Modal";
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

$(".modal-screen").add(".modal-close-icon").click(function(event) {
	/* Act on the event */
	uiAnimations.hideModalScreen($(".modal-screen"));
	uiAnimations.hideModal($(".modal-showing"));
});

$("img.icon-cross").click(function(event) {
	/* Act on the event */
	const currentOpacity = $(this).css("opacity");

	if (currentOpacity == "0") {
		$(this).css("opacity", "1");
	} else {
		$(this).css("opacity", "0");
	}
});