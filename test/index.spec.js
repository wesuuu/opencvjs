const cv = require('../index')
const Jimp = require('jimp');
const assert = require('assert');
const fs = require('fs');

const OPENCV_VERSION = process.env.OPENCV_VERSION;
const OUTPUT_FILE = './output.png';

// https://stackoverflow.com/questions/17699599/node-js-check-if-file-exists
const fileExists = async path => !!(await fs.promises.stat(path).catch(e => false));

function jimpExample() {
    return new Promise((resolve, reject) => {
        Jimp.read('./test/lena.jpg')
            .then((lena) => {
                var src = cv.matFromImageData(lena.bitmap);
                let dst = new cv.Mat();
                let M = cv.Mat.ones(5, 5, cv.CV_8U);
                let anchor = new cv.Point(-1, -1);
                cv.dilate(src, dst, M, anchor, 1, cv.BORDER_CONSTANT, cv.morphologyDefaultBorderValue());
                return dst, src;
            })
            .then((dst) => {
                const j = new Jimp({
                    width: dst.cols,
                    height: dst.rows,
                    data: Buffer.from(dst.data)
                })
                .write(OUTPUT_FILE)
                // force some lag time since write isn't a promise and not really async
                return setTimeout(() => {
                    resolve(true);
                }, 100)
            })
            .catch((err) => reject(err));
    })
}

describe('opencv.js', () => {
    after((done) => {
        fs.unlink(OUTPUT_FILE, function(err){
            if(err) return console.log(err);
            console.log('file deleted successfully');
            done();
       });  
    });

    it('Version should be in getBuildInformation()', () => {
        const buildInfo = cv.getBuildInformation();
        assert.notEqual(buildInfo.indexOf(OPENCV_VERSION), -1);
    });

    it('Working with images example', async () => {
        // load local image file with jimp. It supports jpg, png, bmp, tiff and gif:
        await jimpExample();
        const outExists = await fileExists(OUTPUT_FILE);
        assert(outExists);
    });
})