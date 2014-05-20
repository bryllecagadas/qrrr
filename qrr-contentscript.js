(function($) {
	function onRequest(message, sender, sendResponse) {
		if(typeof message.go === "undefined") {
			return;
		}
		var url = document.location.href;
		var width = url.length * 3;
		width = width < 100 ? 100 : width;
		var height = width;

		if($("#qr-code-wrapper").length) {
			$("#qr-code-wrapper").remove();
		}

		var wrapper = $("<div>").attr("id", "qr-code-wrapper");
		wrapper.append($("<div>").attr("id", "qr-code"));
		$("body").append(wrapper);

		$("#qr-code-wrapper")
			.css("cursor", "pointer")
			.css("background", "#fff")
			.css("position", "absolute")
			.css("width", "100%")
			.css("height", "100%")
			.css("top", "0")
			.css("left", "0")
			.css("z-index", 99999)
		.click(function() {
			$(this).remove();
			$("body").css("overflow", "auto");
		});

		var wHeight = $(window).height();
		var wWidth = $(window).width();

		var width;
		var height;

		if(wWidth > wHeight) {
			width = height = wHeight - 50;

			var top = "25px";
			var left = ((wWidth - width) / 2) + "px";
		} else {
			width = height = wWidth - 50;

			var top = ((wHeight - height) / 2) + "px";
			var left = "25px";
		}

		$("#qr-code")
			.css("position", "absolute")
			.css("top", top)
			.css("left", left)
		.qrcode({
			render: "table",
			text: url,
			width: width,
			height: height
		});

		$("body").css("overflow", "hidden");

		sendResponse({});
	}
	chrome.runtime.onMessage.addListener(onRequest);
})(jQuery);