var currentRow = 0;
var currentColumn = 0

var wordLength = 5;
var wordlesToSolve = 2;

var bulkAllowedKeys = 'abcdefghijklmnopqrstuvwxyz';
var allowedKeys = bulkAllowedKeys.split('');

var allowedWords = ['ADIEU', 'SLATE', 'PINES', 'STEAL'] //TODO: retrieve allowed words from server

var wordsToFind = ['SLATE', 'PINES']; //TODO: retrieve words from server

document.addEventListener('keydown', processKeydown);
document.addEventListener('keyup', processKeyup);


function processKeydown(e: KeyboardEvent): void {
    console.log(e);
    if (e.code === 'Backspace') {
        if (currentColumn > 0) {
            currentColumn = currentColumn - 1;
        }
        setInputValue(currentRow, currentColumn, '');
    } else if (e.code === 'Enter') {
        if (currentColumn === wordLength) {
            evaluateWord(currentRow);
        }
    }
}

function processKeyup(e: KeyboardEvent): void {
    if (allowedKeys.includes(e.key)) {
        if (currentColumn < wordLength) {
            setInputValue(currentRow, currentColumn, e.key);
            currentColumn = currentColumn + 1;
        }
    }
}

//TODO: all these querySelector functions should not exist and inputs should be in an array in memory
function getInputs(row: number, column: number): NodeListOf<HTMLFormElement> {
    return document.querySelectorAll("#hidden-" + column + ", .cell-" + row + "-" + column);
}

function getWordleInputs(row: number, column: number): NodeListOf<HTMLFormElement> {
    return document.querySelectorAll(".cell-" + row + "-" + column);
}
function getInputValue(column: number): any {
    return (document.querySelector("#hidden-" + column) as HTMLFormElement).value;
}

function setInputValue(row, column, value): void {
    getInputs(row, column).forEach(function (input) {
        input.value = value.toUpperCase();
    })
}

function getWord(): string {
    var word: string = '';
    for (var i = 0; i < wordLength; i++) {
        word += getInputValue(i);
    }
    return word;
}

function evaluateWord(row: number): void {
    var word = getWord();
    if (isWord(word)) {
        markCharacters(row, word);
        currentRow++;
        currentColumn = 0;
    } else {
        //TODO: mark letters red
    }
}

function markCharacters(row: number, word: string): void {
    for (var i = 0; i < wordLength; i++) {
        var inputs = getWordleInputs(row, i)
        inputs.forEach(function (input) {
            var wordleId = parseInt(input.dataset["wordleId"]);
            var wordToFind = wordsToFind[wordleId];
            var charGuess = word[i];
            var charSolution = wordToFind[i];

            if (charGuess === charSolution) {
                input.classList.add('guess-correct');
            } else if (wordToFind.includes(charGuess)) {
                input.classList.add('guess-position');
            } else {
                input.classList.add('guess-incorrect');
            }
        })

    }
}

function isWord(word: string): boolean {
    return allowedWords.includes(word);
}