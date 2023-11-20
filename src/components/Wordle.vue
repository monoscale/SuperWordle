<script setup lang="ts">
import { onUnmounted, reactive, ref } from 'vue';
import { Wordle } from '../models/Wordle';

import type { WordleCharacter } from '../models/WordleCharacter'
import { WordleCharacterState } from '@/models/WordleCharacterState';
import { isWordAllowed, getRandomWord } from '../models/Words';

const wordLength = 5;
const wordlesToSolve = 128;
const attempts = wordlesToSolve + 5;



let wordles = reactive(Array.from({ length: wordlesToSolve }, () => (new Wordle(getRandomWord(), attempts))));

let currentTile = 0;
let remainingAttempts = ref(attempts);

window.addEventListener('keyup', onKeyup)
onUnmounted(() => {
    window.removeEventListener('keyup', onKeyup)
})

function onKeyup(e: KeyboardEvent) {
    const key = e.key;
    if (/^[a-zA-Z]$/.test(key) && currentTile < wordLength) {
        fillTile(key.toUpperCase() as WordleCharacter);
        currentTile++;
        if (currentTile == wordLength) {
            checkWordAllowed();
        }
    } else if (key === 'Backspace' && currentTile > 0) {
        currentTile--;
        getUncompletedWordles().forEach(wordle => wordle.setGuessState(WordleCharacterState.INITIAL));
        clearTile();
    } else if (currentTile == wordLength && key === 'Enter') {
        checkGuess();
    }
}

function fillTile(character: WordleCharacter) {
    getUncompletedWordles().forEach(wordle => wordle.setCharacterGuess(character));
}

function clearTile() {
    getUncompletedWordles().forEach(wordle => wordle.clearCharacterGuess());
}

function checkGuess() {
    if (checkWordAllowed()) {
        getUncompletedWordles().forEach(wordle => wordle.checkGuess());
        currentTile = 0;
        remainingAttempts.value--;
        wordles = wordles.sort((a, b) => a.getSortOrder() - b.getSortOrder());
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

function getUncompletedWordles() {
    return wordles.filter(x => !x.completed);
}

</script>

<template>
    {{ remainingAttempts }}

    <div>
        <div v-for="(wordle, index) in wordles" v-bind:key="index" class="wordle">
            <div v-for="(row, index) in wordle.guesses" v-bind:key="index">
                <input v-for="(tile, index) in row.characters" v-bind:key="index" disabled class="tile" :class="tile.state"
                    v-bind:value="tile.character" />
            </div>
        </div>
    </div>
</template>

<style scoped>
.wordle {
    display: inline-block;
    margin: 5px;
}

.tile {
    height: 25px;
    width: 25px;
    text-align: center;
    justify-content: center;
    border: 1px solid black;
    box-shadow: none;
    display: inline-block;
}

.tile.absent {
    background-color: gray;
    color: white;
}

.tile.present {
    background-color: yellow;
    color: black;
}

.tile.correct {
    background-color: green;
    color: white;
}

.tile.invalid {
    background-color: red;
    color: white;
}
</style>