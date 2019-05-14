const fs = require('fs');
const dotenv = require('dotenv');

if (fs.existsSync('.env.local')) {

    const envConfig = dotenv.parse(fs.readFileSync('.env.local'));
    for (let k in envConfig) {
        process.env[k] = envConfig[k];
    }

}

module.exports = {
    plugins: {
        'posthtml-expressions': {
            locals: {
                IMPRINT_NAME: process.env.IMPRINT_NAME,
                IMPRINT_STREET: process.env.IMPRINT_STREET,
                IMPRINT_CITY: process.env.IMPRINT_CITY,
                IMPRINT_COUNTRY: process.env.IMPRINT_COUNTRY,
                IMPRINT_TELEPHONE: process.env.IMPRINT_TELEPHONE,
                IMPRINT_EMAIL: process.env.IMPRINT_EMAIL,
            },
        },
    },
};
