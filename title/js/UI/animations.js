

// function HideModal() {
// 	this.applyTo = function(dom) {
// 		let prevTop = dom.css("top");
// 		dom.animate({top: "+=20%"}, 70, function() {
// 			$(this).animate({top: "-=150%"}, 400, function () {
// 				dom.addClass('modal-hidden');
// 				dom.css({"top": prevTop, "display": "none"});
// 			});
// 		});
// 	}
// }

// const hideModal = new HideModal();

// const hideModal2 = new Bounce();
// hideModal2.scale({
// 	from: {x: 1.0, y: 1.0 },
// 	to: {x: 0.0, y: 0.0}
// });

function UIAnimations () {
	this.showModal = function(dom) {
		dom.removeClass('modal-hidden');
		dom.addClass('modal-showing');
		dom.css("display", "block");

		const bounceAnim = new Bounce();
		bounceAnim.scale({
			from: {x: 0.0, y: 0.0 },
			to: {x: 1.0, y: 1.0}
		});
		bounceAnim.applyTo(dom);
	}

	this.hideModal = function(dom) {
		let prevTop = dom.css("top");
		dom.animate({top: "+=20%"}, 70, function() {
			$(this).animate({top: "-=150%"}, 250, function () {
				dom.removeClass('modal-showing');
				dom.addClass('modal-hidden');
				dom.css({"top": prevTop, "display": "none"});
			});
		});
	}

	this.showModalScreen = function(dom) {
		dom.css("display", "block");
		dom.animate({"opacity": "0.5"}, 200);
	}

	this.hideModalScreen = function(dom) {
		dom.animate({"opacity": "0.0"}, 350, function () {
			dom.css("display", "none");
		});
	}
}

const uiAnimations = new UIAnimations();