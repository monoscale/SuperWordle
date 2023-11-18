<script setup lang="ts">
import { onUnmounted, reactive } from 'vue';
import { Wordle } from '../models/Wordle'
import type { WordleCharacter } from '../models/WordleCharacter'

const wordLength = 5;
const attempts = 6;

const wordle = reactive(new Wordle('STEAL'));

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
        clearTile();
    } else if (key === 'Enter') {
        checkGuess();
        currentTile = 0;
    }
}

function fillTile(character: WordleCharacter) {
    wordle.setCharacterGuess(character);
}

function clearTile() {
    wordle.clearCharacterGuess();
}

function checkGuess() {
    wordle.checkGuess();
}

</script>

<template>
    <div v-for="(row, index) in wordle.guesses">
        <div v-for="(tile, index) in row.characters">
            <div class="tile" :class="tile.state">
                {{ tile.character }}
            </div>
        </div>
        <br>
    </div>
</template>

<style scoped>
.tile {
    padding: 30px;
    border: 1px solid black;
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
</style>