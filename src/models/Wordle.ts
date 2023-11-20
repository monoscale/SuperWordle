import type { WordleCharacter } from "./WordleCharacter";
import { WordleCharacterState } from "./WordleCharacterState";
import { WordleGuess } from "./WordleGuess";

export class Wordle {
    public word: string;
    public guesses: WordleGuess[];
    public completed: boolean = false;
    
    private maximumAttempts: number;
    private currentGuessIndex: number = 0;
    
    constructor(word: string, maximumAttempts: number) {
        this.word = word;
        this.maximumAttempts = maximumAttempts;
        this.guesses = [new WordleGuess()];
    }

    public setCharacterGuess(character: WordleCharacter) {
        this.guesses[this.currentGuessIndex].setCharacter(character);
    }

    public setGuessState(state: WordleCharacterState) {
        for (let i = 0; i < this.guesses[this.currentGuessIndex].characters.length; i++) {
            this.guesses[this.currentGuessIndex].setCharacterState(i, state);
        }
    }

    public clearCharacterGuess() {
        this.guesses[this.currentGuessIndex].clearCharacter();
    }

    public getGuess(): string {
        return this.guesses[this.currentGuessIndex].getGuess();
    }

    public checkGuess(): void {
        const guess = this.getGuess();
        let correctCount: number = 0;
        for (let i = 0; i < this.word.length; i++) {
            const charWord = this.word[i];
            const charGuess = guess[i];
            if (charWord === charGuess) {
                this.guesses[this.currentGuessIndex].setCharacterState(i, WordleCharacterState.CORRECT);
                correctCount++;
            } else if (this.word.includes(charGuess)) {

                const indexOfChar = this.word.indexOf(charGuess);
                if (indexOfChar >= 0 && this.word[indexOfChar] == guess[indexOfChar]) {
                    this.guesses[this.currentGuessIndex].setCharacterState(i, WordleCharacterState.ABSENT);
                } else {
                    this.guesses[this.currentGuessIndex].setCharacterState(i, WordleCharacterState.PRESENT);
                }
            } else {
                this.guesses[this.currentGuessIndex].setCharacterState(i, WordleCharacterState.ABSENT);
            }
        }
        if (correctCount == 5) {
            this.guesses = [this.guesses[this.currentGuessIndex]];
            this.completed = true;
        } else {
            this.guesses.push(new WordleGuess());
            this.currentGuessIndex++;
        }
    }
}