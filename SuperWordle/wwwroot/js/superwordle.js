var currentRow = 0;
var currentColumn = 0;
var wordLength = 5;
var wordlesToSolve = 2;
var bulkAllowedKeys = 'abcdefghijklmnopqrstuvwxyz';
var allowedKeys = bulkAllowedKeys.split('');
var allowedWords = ['ADIEU', 'SLATE', 'PINES', 'STEAL']; //TODO: retrieve allowed words from server
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
    }
    else if (e.code === 'Enter') {
        if (currentColumn === wordLength) {
            evaluateWord(currentRow);
        }
    }
}
function processKeyup(e) {
    if (allowedKeys.includes(e.key)) {
        if (currentColumn < wordLength) {
            setInputValue(currentRow, currentColumn, e.key);
            currentColumn = currentColumn + 1;
        }
    }
}
function getInputs(row, column) {
    return document.querySelectorAll("#hidden-" + column + ", .cell-" + row + "-" + column);
}
function getWordleInputs(row, column) {
    return document.querySelectorAll(".cell-" + row + "-" + column);
}
function getInputValue(column) {
    return document.querySelector("#hidden-" + column).value;
}
function setInputValue(row, column, value) {
    getInputs(row, column).forEach(function (input) {
        input.value = value.toUpperCase();
    });
}
function getWord() {
    var word = '';
    for (var i = 0; i < wordLength; i++) {
        word += getInputValue(i);
    }
    return word;
}
function evaluateWord(row) {
    var word = getWord();
    if (isWord(word)) {
        markCharacters(row, word);
        currentRow++;
        currentColumn = 0;
    }
    else {
        //TODO: mark letters red
    }
}
function markCharacters(row, word) {
    for (var i = 0; i < wordLength; i++) {
        var inputs = getWordleInputs(row, i);
        inputs.forEach(function (input) {
            console.log(input);
            var wordleId = parseInt(input.dataset["wordleId"]);
            console.log(wordleId, wordsToFind);
            var wordToFind = wordsToFind[wordleId];
            var charGuess = word[i];
            var charSolution = wordToFind[i];
            if (charGuess === charSolution) {
                input.classList.add('guess-correct');
            }
            else if (wordToFind.includes(charGuess)) {
                input.classList.add('guess-position');
            }
            else {
                input.classList.add('guess-incorrect');
            }
        });
    }
}
function isWord(word) {
    return allowedWords.includes(word);
}
//# sourceMappingURL=superwordle.js.map