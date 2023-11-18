import type { WordleCharacter } from "./WordleCharacter";
import { WordleCharacterState } from "./WordleCharacterState";
import { WordleGuess } from "./WordleGuess";

export class Wordle {
    public word: string;
    public guesses: WordleGuess[];
    private currentGuessIndex: number;

    constructor(word: string) {
        this.word = word;
        this.guesses = Array.from({ length: 6 }, () => (new WordleGuess()));
        this.currentGuessIndex = 0;
    }

    public setCharacterGuess(character: WordleCharacter) {
        this.guesses[this.currentGuessIndex].setCharacter(character);
    }

    public clearCharacterGuess() {
        this.guesses[this.currentGuessIndex].clearCharacter();
    }

    public getGuess(): string {
        return this.guesses[this.currentGuessIndex].getGuess();
    }

    public checkGuess(): void {
        const guess = this.getGuess();
        for (let i = 0; i < this.word.length; i++) {
            const charWord = this.word[i];
            const charGuess = guess[i];

            if (charWord === charGuess) {
                this.guesses[this.currentGuessIndex].setCharacterState(i, WordleCharacterState.CORRECT);
            } else if (this.word.includes(charGuess)) {
                const indexOfChar = this.word.indexOf(charGuess);
                if (indexOfChar > 0 && this.word[indexOfChar] == guess[indexOfChar]) {
                    this.guesses[this.currentGuessIndex].setCharacterState(i, WordleCharacterState.ABSENT);
                } else {
                    this.guesses[this.currentGuessIndex].setCharacterState(i, WordleCharacterState.PRESENT);
                }
            } else {
                this.guesses[this.currentGuessIndex].setCharacterState(i, WordleCharacterState.ABSENT);
            }
        }
        this.currentGuessIndex++;
    }
}