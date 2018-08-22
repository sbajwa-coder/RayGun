var alertTimeout = null;

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

	this.showAlert = function(dom, button, callback = function(){}) {

		if (alertTimeout) clearTimeout(alertTimeout);

		let items = button.add(".modal-screen").add(".modal-close-icon")
					.attr('disabled', 'disabled');

		dom.animate({"opacity": "0.75"}, 200, function () {
			alertTimeout = setTimeout(function () {
				dom.animate({"opacity": "0.0"}, 200, function() {
					dom.css("display", "none");
					items.removeAttr('disabled');
					callback();
				});
			}, 2000);
		});
	}
}

const uiAnimations = new UIAnimations();