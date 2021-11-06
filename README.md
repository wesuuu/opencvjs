# opencvjs

Node bindings for opencv.js (https://docs.opencv.org/4.5.3/d5/d10/tutorial_js_root.html)

Current version = 4.5.4

## Example usage

```javascript
const cv = require('opencv-bindings');

// set a timeout, it takes some time for opencv.js to load since it's just one massive file
setTimeout(() => {
    console.log(cv.getBuildInformation());
}, 1000);

```
