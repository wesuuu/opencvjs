# opencvjs

Node bindings for opencv.js (https://docs.opencv.org/4.5.3/d5/d10/tutorial_js_root.html)

Current version = 4.5.4

## Development

Runs as a simple node.js container (built from vscode). Specify the environment variable `OPENCV_VERSION` and run the command `fetch-opencv-js.sh`. This will download the opencv version available at https://github.com/opencv/opencv/releases/tag/4.5.4

Once downloaded, run the commands:

```bash
npm install # make sure you're in the project directory
npm run test
```

Tests are based off the opencv.js node.js tutorial https://docs.opencv.org/4.5.4/dc/de6/tutorial_js_nodejs.html

## Example usage

```javascript
const cv = require('opencv-bindings');

// set a timeout, it takes some time for opencv.js to load since it's just one massive file
setTimeout(() => {
    console.log(cv.getBuildInformation());
}, 1000);

```
