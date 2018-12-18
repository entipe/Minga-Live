define(['webfontloader'], function(WebFont) {
	const init = function (families, urls) {
		WebFont.load({
			custom: {
			    families: families,
			    urls: urls
			},
			active: function() {
			    sessionStorage.fonts = true;
			}
		});
	}

	return {
		init: init
	};
});