const uncss = require('uncss');
const fs = require('fs');
const filesize = require('filesize');

let cssFileName = 'hey';

const files = ['./dist/index.html', './dist/imprint.html'];
const options = {
    ignore: ['.uk-accordion', '.uk-accordion>:nth-child(n+2)', '/[.]*uk-accordion.*/', '/[.]*uk-modal.*/', '.uk-close', '.uk-icon', '#imprint-text'],
    ignoreSheets: [/fonts.googleapis/],
    timeout: 1500,
    htmlroot: './dist/',
    inject: function (window) {
        const path = window.location.pathname;
        const pageName = path.split('/').pop();

        console.log('Inject: ' + pageName);

        if (pageName !== 'index.html') {
            return;
        }

        const accordions = window.document.querySelectorAll('.uk-accordion-title');
        accordions.forEach(function (value) {
            value.click();
        });

        const imprintToggle = window.document.getElementById('imprintToggle');
        if (imprintToggle) {
            imprintToggle.click();
        }

        const styleSheets = window.document.querySelectorAll('link[rel="stylesheet"]');
        cssFileName = Array.from(styleSheets).map(function (value) {
            let href = value.href;
            return href.split('/').pop();
        }).find(function (value) {
            return value.indexOf('index.') >= 0;
        });
    },
};

uncss(files, options, function (error, output) {
    if (error) {
        console.error('Error while uncssing: ', error);
        return;
    }
    const path = 'dist/' + cssFileName;
    const sizeBefore = fs.statSync(path).size;
    fs.writeFileSync(path, output);
    const sizeAfter = fs.statSync(path).size;

    console.log('UnCss finished! Size: ' + filesize(sizeBefore) + ' -> ' + filesize(sizeAfter));
});
