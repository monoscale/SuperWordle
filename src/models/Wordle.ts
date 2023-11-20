import type { WordleCharacter } from "./WordleCharacter";
import { WordleCharacterState } from "./WordleCharacterState";
import { WordleGuess } from "./WordleGuess";

export class Wordle {
    public word: string;
    public guesses: WordleGuess[];
    public completed: boolean = false;

    private currentGuess: WordleGuess;
    private maximumAttempts: number;
    private currentGuessIndex: number = 0;

    constructor(word: string, maximumAttempts: number) {
        this.word = word;
        this.maximumAttempts = maximumAttempts;
        this.guesses = [new WordleGuess()];
        this.currentGuess = this.guesses[0];
    }

    public setCharacterGuess(character: WordleCharacter) {
        this.currentGuess.setCharacter(character);
    }

    public setGuessState(state: WordleCharacterState) {
        for (let i = 0; i < this.currentGuess.characters.length; i++) {
            this.currentGuess.setCharacterState(i, state);
        }
    }

    public clearCharacterGuess() {
        this.currentGuess.clearCharacter();
    }

    public getGuess(): string {
        return this.currentGuess.getGuess();
    }

    public checkGuess(): void {
        const guess = this.getGuess();
        let correctCount: number = 0;
        for (let i = 0; i < this.word.length; i++) {
            const charWord = this.word[i];
            const charGuess = guess[i];
            if (charWord === charGuess) {
                this.currentGuess.setCharacterState(i, WordleCharacterState.CORRECT);
                correctCount++;
            } else if (this.word.includes(charGuess)) {

                const indexOfChar = this.word.indexOf(charGuess);
                if (indexOfChar >= 0 && this.word[indexOfChar] == guess[indexOfChar]) {
                    this.currentGuess.setCharacterState(i, WordleCharacterState.ABSENT);
                } else {
                    this.currentGuess.setCharacterState(i, WordleCharacterState.PRESENT);
                }
            } else {
                this.currentGuess.setCharacterState(i, WordleCharacterState.ABSENT);
            }
        }
        if (correctCount == 5) {
            this.guesses = [this.currentGuess];
            this.completed = true;
        } else if (this.currentGuessIndex < this.maximumAttempts) {
            this.currentGuess = new WordleGuess();
            this.guesses.push(this.currentGuess);
            
            this.currentGuessIndex++;
        }
    }
}