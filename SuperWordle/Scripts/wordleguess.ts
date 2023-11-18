export class WordleGuess {
    inputs: NodeListOf<HTMLFormElement>

    constructor(inputs: NodeListOf<HTMLFormElement>) {
        this.inputs = inputs;
    }

    getWord(): string {
        var word: string = '';
        this.inputs.forEach(function (input) {
            word += input.value;
        });

        return word;
    }

    setCharacter(index, character) {
        console.log(this.inputs, index, character);
        this.inputs[index].value = character;
    }
}