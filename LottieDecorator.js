/*!
Lottie Decorator 1.0.5 (dependant on Hype Data Decorator)
copyright (c) 2021 Max Ziebell, (https://maxziebell.de). MIT-license
*/

/*
* Version-History
* 1.0.0 Initial release under MIT-license
* 1.0.1 Fix for scenes and layout switching
* 1.0.2 Wrapped in IIFE, instance interface
* 1.0.3 Changed to data-lottie-data, now allows direct data
* 1.0.4 Small fixes and tweaks, stability, garbage collection
* 1.0.5 Removed leftover console.log statements
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

	function stringToBoolean(val){
		if (!val || typeof val != 'string') return;
		return val.toLowerCase().trim() == 'true';
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
				elm.innerHTML = '';
			}

			element.dataset.lottieRendered = element.dataset.lottieData;
			
			var options = {
				container: elm,
				renderer: 'svg',
				name: lottieId(element),
				autoplay:  stringToBoolean(element.dataset.lottieAutoplay) || false,
				loop: stringToBoolean(element.dataset.lottieLoop) || false,
			};
			
			if (element.dataset.lottieData.indexOf('.json')==-1) {
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

	function HypeSceneUnload(hypeDocument, element, event){
		var sceneElm = document.getElementById(hypeDocument.currentSceneId());
		sceneElm.querySelectorAll('[data-lottie-rendered]').forEach(function(elm){
			elm.removeAttribute('data-lottie-rendered');
			lottie.destroy(lottieId(elm));
		});
		// uncomment to destroy all instances page wide
		//lottie.destroy();
	}

	if("HYPE_eventListeners" in window === false) { window.HYPE_eventListeners = Array(); }
	window.HYPE_eventListeners.push({"type":"HypeSceneUnload", "callback":HypeSceneUnload});


	function getInstanceForElement(element){
		return lottieInstance[lottieId(element)];
	}

	function getInstanceById(id){
		return lottieInstance['lottie'+id];
	}

	/* Reveal Public interface to window['LottieDecorator'] */
	return {
		version: '1.0.5',
		'getInstanceForElement' : getInstanceForElement,
		'getInstanceById' : getInstanceById,
	};
})();
