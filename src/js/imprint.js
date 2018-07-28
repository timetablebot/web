import UIKit from 'uikit/dist/js/uikit';

document.addEventListener('DOMContentLoaded', () => {
    loadImprint();
});

function loadImprint() {
    if (!window.fetch) {
        console.error('Your browser doesn\'t support fetch!');
        return;
    }

    fetch('imprint.html').then(request => {
        if (!request.ok) {
            throw request.ok;
        }
        return request.text();
    }).then(result => {
        const parser = new DOMParser();
        const htmlDocument = parser.parseFromString(result, 'text/html');
        updateModalText(htmlDocument.body);
        updateButton();
    }).catch(err => {
        console.error('Error while loading the impress', err);
    });
}

function updateModalText(dom) {
    let element = document.getElementById('imprint-text');
    // Removing all children
    while (element.firstChild) {
        element.removeChild(element.firstChild);
    }
    // Adding the new dom as child
    element.appendChild(dom);
}

function updateButton() {
    let element = document.getElementById('imprintToggle');
    element.href = '#imprint';
    UIKit.toggle(element, {
        target: '#imprint',
    });
}