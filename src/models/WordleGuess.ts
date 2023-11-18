import { WordleLetter } from "./WordleLetter";
import type { WordleCharacter } from "./WordleCharacter";
import type { WordleCharacterState } from "./WordleCharacterState";

export class WordleGuess {

    public characters: WordleLetter[];
    private currentCharacterIndex: number;

    constructor() {
        this.characters = Array.from({ length: 5 }, () => new WordleLetter());
        this.currentCharacterIndex = 0;
    }

    public setCharacter(character: WordleCharacter) {
        this.characters[this.currentCharacterIndex].character = character;
        this.currentCharacterIndex++;
    }

    public clearCharacter() {
        this.currentCharacterIndex--;
        this.characters[this.currentCharacterIndex].character = '';
    }

    public getGuess(): string {
        return this.characters.map(x => x.character).join('');
    }

    public setCharacterState(index: number, state: WordleCharacterState) {
        this.characters[index].state = state;
    }
}
