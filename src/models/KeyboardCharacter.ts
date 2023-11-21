import { KeyboardCharacterState } from "./KeyboardCharacterState";
import type { WordleCharacter } from "./WordleCharacter";

export class KeyboardCharacter {
    public character: WordleCharacter;
    public state: KeyboardCharacterState;

    constructor(character: WordleCharacter) {
        this.state = KeyboardCharacterState.UNUSED;
        this.character = character;
    }
}