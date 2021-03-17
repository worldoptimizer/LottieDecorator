
/*!
Lottie Decorator 1.0.3 (dependant on Hype Data Decorator)
copyright (c) 2019-2021 Max Ziebell, (https://maxziebell.de). MIT-license
*/

/*
* Version-History
* 1.0.0 Initial release under MIT-license
* 1.0.1 Fix for scenes and layout switching
* 1.0.2 Wrapped in IIFE, instance interface
* 1.0.3 Changed to data-lottie-data, now allows direct data
*/

if("LottieDecorator" in window === false) window['LottieDecorator'] = (function () {
	if (!window.HypeDataDecorator) {
		console.log('%cHypeDataDecorator not loaded/missing!','background-color:red;color:white;padding:3px;border-radius:4px;');
		return;
	}

	var lottieInstance = {};
	
	function lottieId (element){
		var id = element.dataset.lottieName || element.id;
		return 'lottie'+id;
	}

	HypeDataDecorator.observeBySelector(
		'[data-lottie-data]', 
		function(hypeDocument, element, event){
			var elm = element.querySelector('.frame');
			var infoElm = element.querySelector('.info');
			if (hypeDocument && infoElm) infoElm.style.display = 'none';
			if (!elm) return;
			
			if (element.dataset.lottieRendered) {
				if (element.dataset.lottieRendered == element.dataset.lottieData) return;
				lottie.destroy(lottieId(element));
			}

			element.dataset.lottieRendered = element.dataset.lottieData;
			
			var options = {
				container: elm,
				renderer: 'svg',
				name: lottieId(element),
				autoplay: false,
				loop: false,
			};
			
			if (element.dataset.lottieData.indexOf('.json')==-1) {
				console.log('was here', element.dataset.lottieData, window[element.dataset.lottieData.trim()]);
				options.animationData = window[element.dataset.lottieData.trim()];
			} else {
				options.path = element.dataset.lottieData;
			}
		
			lottieInstance[lottieId(element)] = lottie.loadAnimation(options);
		},
		{ attributeFilter: ['data-lottie-data'] }
	);

	HypeDataDecorator.observeBySelector(
		'[data-lottie-data] .time', 
		function(hypeDocument, element, event){
			var elm = element.parentNode.parentNode;
			if (!elm.dataset.lottieRendered) return;

			var anim = lottieInstance[lottieId(elm)];
			var totalFrames = anim && anim.totalFrames? anim.totalFrames : 0;
			var frame = Math.round(totalFrames * parseInt(element.style.width)/100) || 0;
			
			if (totalFrames && frame < totalFrames) lottie.goToAndStop(frame, true, lottieId(elm));

			if (!hypeDocument) {
				var infoElm = element.querySelector('.info');
				if (infoElm) infoElm.innerHTML = Math.min(frame, totalFrames);
			}
		}
	);

	function getInstanceForElement(element){
		return lottieInstance[lottieId(element)];
	}

	function getInstanceById(id){
		return lottieInstance['lottie'+id];
	}

	/* Reveal Public interface to window['LottieDecorator'] */
	return {
		version: '1.0.3',
		'getInstanceForElement' : getInstanceForElement,
		'getInstanceById' : getInstanceById,
	};
})();
