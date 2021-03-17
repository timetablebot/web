const fs = require('fs');
const dotenv = require('dotenv');

const file = fs.existsSync('.env.local') ? '.env.local' : '.env';
const env = dotenv.parse(fs.readFileSync(file));

module.exports = {
    plugins: {
        'posthtml-expressions': {
            locals: {
                IMPRINT_NAME: env.IMPRINT_NAME,
                IMPRINT_STREET: env.IMPRINT_STREET,
                IMPRINT_CITY: env.IMPRINT_CITY,
                IMPRINT_COUNTRY: env.IMPRINT_COUNTRY,
                IMPRINT_TELEPHONE: env.IMPRINT_TELEPHONE,
                IMPRINT_EMAIL: env.IMPRINT_EMAIL,
            },
        },
    },
};
