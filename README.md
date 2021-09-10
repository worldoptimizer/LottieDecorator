# LottieDecorator
Play Lottie files in your Hype project (depends on Hype Data Decorator). To make this work in a fresh document, you need to include the Lottie runtime (light or full) and Hype Data Decorator before including this file. In a production scenario, you could also combine the three in the mentioned order into one single JavaScript file.

This repository also includes a Python file that can batch convert Lottie JSON files into JavaScript variables, further reducing requests. The usage of this Python script and the entailed conversion is completely optional.

## Version-History
`1.0.0 Initial release under MIT-license`\
`1.0.1 Fix for scenes and layout switching`\
`1.0.2 Wrapped in IIFE, instance interface`\
`1.0.3 Changed to data-lottie-data, now allows direct data`\
`1.0.4 Small fixes and tweaks, stability, garbage collection`\
`1.0.5 Removed leftover console.log statements`


Content Delivery Network (CDN)
--
Latest version can be linked into your project using the following in the head section of your project:

```html
<script src="https://cdn.jsdelivr.net/gh/worldoptimizer/LottieDecorator/LottieDecorator.min.js"></script>
```

Optionally you can also link a SRI version or specific releases. 
Read more about that on the JsDelivr (CDN) page for this extension at https://www.jsdelivr.com/package/gh/worldoptimizer/LottieDecorator

Learn how to use the latest extension version and how to combine extensions into one file at
https://github.com/worldoptimizer/HypeCookBook/wiki/Including-external-files-and-Hype-extensions

---
