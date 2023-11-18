import { WordleCheckInformation } from "./wordlecheck";
import { WordleGuess } from "./wordleguess";

export class Wordle {
    private wordToGuess: string;
    private wordFound: boolean;
    private guesses: WordleGuess[];
    constructor(wordToGuess: string) {
        this.wordToGuess = wordToGuess;
        this.wordFound = false;
    }

    public evaluateGuess(guess: WordleGuess): WordleCheckInformation[] {
        let word = guess.getWord();
        let result: WordleCheckInformation[] = [];
        for (let i = 0; i < word.length; i++) {
            var charGuess = word[i];
            var charSolution = this.wordToGuess[i];

            if (charGuess === charSolution) {
                result.push(WordleCheckInformation.InAnswerAndCorrectPlace);
            } else if (this.wordToGuess.includes(charGuess)) {
                // character should be on other place, but check if that place does not yet already have that character in the guess
                let indexOfChar = this.wordToGuess.indexOf(charGuess);
                if (indexOfChar > 0 && this.wordToGuess[indexOfChar] == word[indexOfChar]) {
                    result.push(WordleCheckInformation.NotInAnswer);
                } else {
                    result.push(WordleCheckInformation.InAnswerNotCorrectPlace);
                }
            } else {
                result.push(WordleCheckInformation.NotInAnswer);
            }
        }
        return result;
    }

    public getWordFound(): boolean {
        return this.wordFound;
    }

    public setWordFound(wordFound: boolean) {
        this.wordFound = wordFound;
    }

}