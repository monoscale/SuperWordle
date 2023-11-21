import { WordleCharacterState } from "./WordleCharacterState";
import type { WordleCharacter } from "./WordleCharacter";

export class WordleLetter {

    public character: WordleCharacter;
    public state: WordleCharacterState;

    constructor(character: WordleCharacter = ''){
        this.character = character;
        this.state = WordleCharacterState.INPUT;
    }
}