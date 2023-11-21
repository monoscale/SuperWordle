import { KeyboardCharacter } from "./KeyboardCharacter";
import { KeyboardCharacterState } from "./KeyboardCharacterState";
import type { WordleCharacter } from "./WordleCharacter";

export class Keyboard {
    private characters: KeyboardCharacter[];

    constructor() {
        this.characters = 'AZERTYUIOPQSDFGHJKLMWXCVBN'.split('').map(x => new KeyboardCharacter(x as WordleCharacter));
    }

    public getKeyboardLayout(): KeyboardCharacter[][] {
        const layout: KeyboardCharacter[][] = [];
        layout.push(this.characters.filter(x => 'AZERTYUIOP'.split('').includes(x.character)));
        layout.push(this.characters.filter(x => 'QSDFGHJKLM'.split('').includes(x.character)));
        layout.push(this.characters.filter(x => 'WXCVBN'.split('').includes(x.character)));
        return layout;
    }

    public setCharacterState(character: string, state: KeyboardCharacterState) {
        this.characters.find(x => x.character === character as WordleCharacter).state = state;
    }

    public setCharactersFromWordAsUsed(word: string) {
        for (let i = 0; i < word.length; i++) {
            this.setCharacterState(word[i], KeyboardCharacterState.USED);
        }
    }
}