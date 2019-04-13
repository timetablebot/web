const fs = require('fs');
const Ssh = require('ssh2');

require('dotenv').config({
    path: '.env.local',
});

const privateKey = process.env.UPLOAD_SSH_KEY.replace('~', require('os').homedir());
const externalPath = process.env.UPLOAD_DIR;

const client = new Ssh();
client.on('ready', () => {
    client.sftp(sftpUpload);
}).connect({
    host: process.env.UPLOAD_HOST,
    port: parseInt(process.env.UPLOAD_PORT),
    username: process.env.UPLOAD_USER,
    privateKey: fs.readFileSync(privateKey),
});

/**
 *
 * @param err
 * @param {SFTPStream} sftpStream
 */
function sftpUpload(err, sftpStream) {
    fs.readdir('./dist', (err, files) => {
        let putProgress = 0;
        const maxProgress = files.length;
        files.forEach(file => {
            sftpStream.fastPut('./dist/' + file, externalPath + '/' + file, err => {
                if (err) throw err;
                if (++putProgress >= maxProgress) {
                    client.end();
                    console.log('Upload finished');
                }
            });
        });
        // client.end();
    });
}
