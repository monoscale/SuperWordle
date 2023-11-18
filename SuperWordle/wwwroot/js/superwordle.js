var currentRow = 0;
var currentColumn = 0

var bulkAllowedKeys = 'abcdefghijklmnopqrstuvwxyz';
var allowedKeys = bulkAllowedKeys.split('');

var allowedWords = ['ADIEU', 'SLATE', 'PINES', 'STEAL'] //TODO: retrieve allowed words from server

var wordsToFind = ['SLATE', 'PINES']; //TODO: retrieve words from server

document.addEventListener('keydown', processKeydown);
document.addEventListener('keyup', processKeyup);

function processKeydown(e) {
    console.log(e);
    if (e.code === 'Backspace') {
        if (currentColumn > 0) {
            currentColumn = currentColumn - 1;
        }
        setInputValue(currentRow, currentColumn, '');
    } else if (e.code === 'Enter') {
        if (currentColumn === @WordleWord.WORD_LENGTH) {
            evaluateWord(currentRow);
        }
    }
}

function processKeyup(e) {
    if (allowedKeys.includes(e.key)) {
        if (currentColumn < @WordleWord.WORD_LENGTH) {
            setInputValue(currentRow, currentColumn, e.key);
            currentColumn = currentColumn + 1;
        }
    }
}

///good luck lol
function getInputs(row, column) {
    return document.querySelectorAll(".cell-" + row + "-" + column);
}

function setInputValue(row, column, value) {
    getInputs(row, column).forEach(function (input) {
        input.value = value.toUpperCase();
    })
}

function getInputValue(row, column) {
    return getInput(row, column).value;
}

function getWord(row) {
    var word = '';
    for (var i = 0; i < @WordleWord.WORD_LENGTH; i++) {
        word += getInputValue(row, i);
    }
    return word;
}

function evaluateWord(row) {
    var word = getWord(row);
    if (isWord(word)) {
        markCharacters(row, word);
        currentRow++;
        currentColumn = 0;
    } else {
        alert('Not a word');
    }
}

function markCharacters(row, word) {
    for (var i = 0; i < @WordleWord.WORD_LENGTH; i++) {
        var input = getInput(row, i);
        var charGuess = word[i];
        var charSolution = wordToFind[i];

        if (charGuess === charSolution) {
            input.classList.add('guess-correct');
        } else if (wordToFind.includes(charGuess)) {
            input.classList.add('guess-position');
        } else {
            input.classList.add('guess-incorrect');
        }
    }
}

function isWord(word) {
    return allowedWords.includes(word);
}