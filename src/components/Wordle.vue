<script setup lang="ts">
import { onUnmounted, ref } from 'vue';
import { WordleLetter } from '../models/WordleLetter'
import type { WordleCharacter } from '../models/WordleCharacter'

const wordLength = 5;
const attempts = 6;

const board = ref(
    Array.from({ length: attempts }, () =>
        Array.from({ length: wordLength }, () => (new WordleLetter('A'))))
);

let currentRow = 0;
let currentTile = 0;

window.addEventListener('keyup', onKeyup)

onUnmounted(() => {
    window.removeEventListener('keyup', onKeyup)
})

function onKeyup(e: KeyboardEvent) {
    const key = e.key;
    if (/^[a-zA-Z]$/.test(key) && currentTile < wordLength) {
        fillTile(key as WordleCharacter);
        currentTile++;
    } else if (key === 'Backspace' && currentTile > 0) {
        currentTile--;
        clearTile();
    } else if (key === 'Enter') {
        checkWord();
    }
}

function fillTile(character: WordleCharacter) {
    board.value[currentRow][currentTile].character = character;
}

function clearTile() {
    board.value[currentRow][currentTile].character = '';
}

function checkWord() {

}

</script>

<template>
    <div v-for="(row, index) in board">
        <div v-for="(tile, index) in row">
            <div class="tile">
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
</style>