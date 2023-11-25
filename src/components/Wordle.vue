<script setup lang="ts">
import { onUnmounted, reactive, ref } from 'vue';
import { Wordle } from '../models/Wordle';

import type { WordleCharacter } from '../models/WordleCharacter'
import { WordleCharacterState } from '@/models/WordleCharacterState';
import { isWordAllowed, getWordsOfTheDay } from '../models/Words';
import { Keyboard } from '@/models/Keyboard';

const wordLength = 5;
const wordlesToSolve = 5;
const attempts = wordlesToSolve + Math.max(Math.log2(wordlesToSolve), 5);

let gameFinished = ref(false);
let currentTile = 0;
let remainingAttempts = ref(attempts);

const words = getWordsOfTheDay(wordlesToSolve);
let wordles = reactive(Array.from({ length: wordlesToSolve }, (val, index) => (new Wordle(words[index], attempts))));
let keyboard = reactive(new Keyboard());

window.addEventListener('keyup', onKeyup)
onUnmounted(() => {
    window.removeEventListener('keyup', onKeyup)
})

function onKeyup(e: KeyboardEvent): void {
    const key = e.key;
    if (/^[a-zA-Z]$/.test(key) && currentTile < wordLength) {
        fillTile(key.toUpperCase() as WordleCharacter);
        currentTile++;
        if (currentTile == wordLength) {
            checkWordAllowed();
        }
    } else if (key === 'Backspace' && currentTile > 0) {
        currentTile--;
        getUncompletedWordles().forEach(wordle => wordle.setGuessState(WordleCharacterState.INPUT));
        clearTile();
    } else if (currentTile == wordLength && key === 'Enter') {
        checkGuess();
    }
}

function fillTile(character: WordleCharacter): void {
    getUncompletedWordles().forEach(wordle => wordle.setCharacterGuess(character));
}

function clearTile(): void {
    getUncompletedWordles().forEach(wordle => wordle.clearCharacterGuess());
}

function checkGuess(): void {
    if (checkWordAllowed()) {
        keyboard.setCharactersFromWordAsUsed(wordles[0].getGuess());
        getUncompletedWordles().forEach(wordle => wordle.checkGuess());

        setTimeout(() => {
            currentTile = 0;
            remainingAttempts.value--;
            wordles = wordles.sort((a, b) => a.getSortOrder() - b.getSortOrder());
        }, 500)
        
    }

    checkGameEnded();
}


function checkGameEnded(): void {
    let message: string | undefined;
    if (wordles.filter(x => !x.completed).length === 0) {
        message = 'You win';
        gameFinished.value = true;
    } else if (remainingAttempts.value === 0) {
        message = 'You lose';
        gameFinished.value = true;
    }

    if (message !== undefined) {
        alert(message);
    }
}

function checkWordAllowed(): boolean {
    let guess = wordles[0].getGuess();
    if (!isWordAllowed(guess)) {
        getUncompletedWordles().forEach(wordle => wordle.setGuessState(WordleCharacterState.INVALID));
        return false;
    }
    return true;
}

function getUncompletedWordles(): Wordle[] {
    return wordles.filter(x => !x.completed) as Wordle[];
}

</script>

<template>
    <p>Attempts remaining: {{ remainingAttempts }}</p>

    <div>
        <div v-for="(keyboardRow, index) in keyboard.getKeyboardLayout()" v-bind:key="index">
            <span v-for="(character, index) in keyboardRow" v-bind:key="index" class="tile" :class="character.state">
                {{ character.character }}
            </span>
        </div>
    </div>

    <div>
        <div v-for="(wordle, index) in wordles" v-bind:key="index" class="wordle">
            <div v-if="!wordle.completed || gameFinished">
                <div v-for="(row, index) in wordle.guesses" v-bind:key="index">
                    <input v-for="(tile, index) in row.characters" v-bind:key="index" disabled class="tile"
                        :class="tile.state" v-bind:value="tile.character" />
                </div>
            </div>

            <span>
                <input v-for="(character, index) in wordle.knownCharacters" v-bind:key="index" disabled
                    v-bind:value="character" class="tile hint" />
            </span>

        </div>
    </div>
</template>

<style scoped>
.wordle {
    display: inline-block;
    margin: 5px;
    vertical-align: top;
}

.tile {
    height: 25px;
    width: 25px;
    text-align: center;
    justify-content: center;
    border: 0.25px solid black;
    box-shadow: none;
    margin-right: 1px;
    display: inline-block;
}

.tile.hint {
    border-radius: 5px;
}

.tile.input {
    background-color: beige;
}

.tile.absent {
    background-color: lightgray;
    color: white;
}

.tile.present {
    background-color: yellow;
    color: black;
}

.tile.correct {
    background-color: lime;
    color: black;
}

.tile.invalid {
    background-color: red;
    color: white;
}

.tile.used {
    background-color: lime;
}
</style>