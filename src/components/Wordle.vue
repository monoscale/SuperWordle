<script setup lang="ts">
import { onUnmounted, reactive } from 'vue';
import { Wordle } from '../models/Wordle';

import type { WordleCharacter } from '../models/WordleCharacter'
import { WordleCharacterState } from '@/models/WordleCharacterState';
import { isWordAllowed, getRandomWord } from '../models/Words';

const wordLength = 5;
const attempts = 6;

const wordle = reactive(new Wordle(getRandomWord()));

let currentTile = 0;

window.addEventListener('keyup', onKeyup)
onUnmounted(() => {
    window.removeEventListener('keyup', onKeyup)
})

function onKeyup(e: KeyboardEvent) {
    const key = e.key;
    if (/^[a-zA-Z]$/.test(key) && currentTile < wordLength) {
        fillTile(key.toUpperCase() as WordleCharacter);
        currentTile++;
    } else if (key === 'Backspace' && currentTile > 0) {
        currentTile--;
        wordle.setGuessState(WordleCharacterState.INITIAL);
        clearTile();
    } else if (key === 'Enter') {
        checkGuess();
    }
}

function fillTile(character: WordleCharacter) {
    wordle.setCharacterGuess(character);
}

function clearTile() {
    wordle.clearCharacterGuess();
}

function checkGuess() {
    let guess = wordle.getGuess();
    if (isWordAllowed(guess)) {
        wordle.checkGuess();
        currentTile = 0;
    } else {
        wordle.setGuessState(WordleCharacterState.INVALID);
    }

}

</script>

<template>
    <div v-for="(row, index) in wordle.guesses" v-bind:key="index">
        <input v-for="(tile, index) in row.characters" v-bind:key="index" disabled class="tile" :class="tile.state"
            v-bind:value="tile.character" />
    </div>
</template>

<style scoped>
.tile {
    height: 50px;
    width: 50px;
    text-align: center;
    justify-content: center;
    border: 1px solid black;
    box-shadow: none;
    border-radius: 2px;
    display: inline-block;
    margin: 10px 5px;
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