import UIKit from 'uikit/dist/js/uikit';

window.addEventListener('load', () => {
    updateAccordionToStage();
    addListenerForStage('app-badge', 1);
    addListenerForStage('telegram-click', 2);
});

/**
 * Updates the instructions accordion to the highest valid stage in the {localStorage}.
 */
function updateAccordionToStage() {
    let currentStage = 0;
    if (isStorageValid('stage_2')) {
        currentStage = 2;
    } else if (isStorageValid('stage_1')) {
        currentStage = 1;
    }

    if (currentStage === 0) {
        // Nothing to do here
        return;
    }

    for (let i = 1; i < 3; i++) {
        if (currentStage >= i) {
            appendCheckMark(`instructions-${i}-title`);
        }
    }

    UIKit.accordion(document.getElementById('instructions-accordion')).toggle(currentStage, true);
}

/**
 * Adds a click listener for all elements with the css class.
 * The listener saves the {stage} to the {localStorage}.
 * @param cssClass {String} The css class to scan for
 * @param stage {Number} The number of the stage to jump to save
 */
function addListenerForStage(cssClass, stage) {
    Array.from(document.getElementsByClassName(cssClass)).forEach(element => {
        element.addEventListener('click', () => {
            addToStorage(`stage_${stage}`);
            updateAccordionToStage();
        });
    });
}

/**
 * Appends a checkmark to the innerText of the element.
 * @param id {String} The identifier of the element
 */
function appendCheckMark(id) {
    const checkMark = '✔️';
    const element = document.getElementById(id);
    // Only append a check mark if there's none
    if (element.innerText.indexOf('✔️') === -1) {
        element.innerText = element.innerText + checkMark;
    }
}

// In Milliseconds
const maxValidTime = 5 * 60 * 1000;

/**
 * Adds a key with the current timestamp to the {localStorage}.
 * @param key {String} The key of the entry
 */
function addToStorage(key) {
    let currentTime = Date.now();
    localStorage.setItem(key, currentTime.toString());
}

/**
 * Checks whether a key exists in the {localStorage} and whether the timestamp is still in the valid range.
 * @param key {String} The key of the entry
 * @return {boolean}
 */
function isStorageValid(key) {
    let item = localStorage.getItem(key);
    if (!item) {
        return false;
    }
    // Converting to a number is very important, otherwise the maxValidTime just would be appended to the string
    item = Number(item);
    let currentTime = Date.now();
    if ((item + maxValidTime) > currentTime) {
        return true;
    } else {
        localStorage.removeItem(key);
        return false;
    }
}