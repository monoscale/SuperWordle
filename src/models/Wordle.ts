import type { WordleCharacter } from "./WordleCharacter";
import { WordleCharacterState } from "./WordleCharacterState";
import { WordleGuess } from "./WordleGuess";

export class Wordle {
    public word: string;
    public guesses: WordleGuess[];
    public completed: boolean = false;
    public knownCharacters: WordleCharacter[];

    private currentGuess: WordleGuess;
    private maximumAttempts: number;
    private currentGuessIndex: number = 0;

    constructor(word: string, maximumAttempts: number, wordLength: number) {
        this.word = word;
        this.maximumAttempts = maximumAttempts - 1; // minus one because of zero based indexing
        this.guesses = [new WordleGuess()];
        this.currentGuess = this.guesses[0];
        this.knownCharacters = Array.from({ length: wordLength }, () => '');
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
        let correctCount = 0;
        for (let i = 0; i < this.word.length; i++) {
            const charWord = this.word[i];
            const charGuess = guess[i];
            if (charWord === charGuess) {
                this.currentGuess.setCharacterState(i, WordleCharacterState.CORRECT);
                this.knownCharacters[i] = charWord as WordleCharacter;
                correctCount++;
            } else if (this.word.includes(charGuess)) {
                const indexOfChar = this.word.indexOf(charGuess);
                if (indexOfChar >= 0 && this.word[indexOfChar] == guess[indexOfChar]) {
                    this.currentGuess.setCharacterState(i, WordleCharacterState.ABSENT);
                } else {
                    let charWordOccurences = this.word.split(charGuess).length - 1;
                    for (let j = 0; j < i; j++) {
                        if (guess[j] == charGuess) {
                            charWordOccurences--;
                        }
                    }
                    if (charWordOccurences > 0) {
                        this.currentGuess.setCharacterState(i, WordleCharacterState.PRESENT);
                    } else {
                        this.currentGuess.setCharacterState(i, WordleCharacterState.ABSENT);
                    }

                }
            } else {
                this.currentGuess.setCharacterState(i, WordleCharacterState.ABSENT);
            }
        }
        if (correctCount == 5) {
            this.completed = true;
        } else if (this.currentGuessIndex < this.maximumAttempts) {
            this.currentGuess = new WordleGuess();
            this.guesses.push(this.currentGuess);

            this.currentGuessIndex++;
        }
    }

    public getSortOrder(): number {
        if (this.completed) {
            return 1000;
        }
        return -1 * this.getKnownCharactersCount();
    }

    private getKnownCharactersCount(){
        return this.knownCharacters.filter(x => x !== '').length;
    }


}