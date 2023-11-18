var WordleGuess = /** @class */ (function () {
    function WordleGuess(inputs) {
        this.inputs = inputs;
    }
    WordleGuess.prototype.getWord = function () {
        var word = '';
        this.inputs.forEach(function (input) {
            word += input.value;
        });
        return word;
    };
    WordleGuess.prototype.setCharacter = function (index, character) {
        console.log(this.inputs, index, character);
        this.inputs[index].value = character;
    };
    return WordleGuess;
}());
export { WordleGuess };
//# sourceMappingURL=wordleguess.js.map