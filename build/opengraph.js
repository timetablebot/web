const fs = require('fs');

fs.copyFileSync('src/img/icon/timetablebot_full.png', 'dist/opengraph.png');

console.log('\nCopied the opengraph.png file\n');
