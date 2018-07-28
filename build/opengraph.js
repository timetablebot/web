//  cp src/img/favicons/apple-touch-icon-144x144.png dist/opengraph.png" // todo create a js file for this
const fs = require('fs');

const filePath = 'src/img/icon/timetablebot_full.png';
const outPath = 'dist/opengraph.png';

fs.copyFileSync(filePath, outPath);

console.log('\nCopied the opengraph.png file\n');