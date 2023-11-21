<script setup lang="ts">
import { onUnmounted, reactive, ref } from 'vue';
import { Wordle } from '../models/Wordle';

import type { WordleCharacter } from '../models/WordleCharacter'
import { WordleCharacterState } from '@/models/WordleCharacterState';
import { isWordAllowed, getRandomWord } from '../models/Words';

const wordLength = 5;
const wordlesToSolve = 2;
const attempts = wordlesToSolve + Math.max(Math.log2(wordlesToSolve), 5) + 1;

let message = ref('');
let gameFinished = ref(false);

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

    if (wordles.filter(x => !x.completed).length === 0) {
        message.value = 'You win';
        gameFinished.value = true;
    } else if (remainingAttempts.value === 0) {
        message.value = 'You lose';
        gameFinished.value = true;
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
    <p v-if="remainingAttempts > 0">Attempts remaining: {{ remainingAttempts }}</p>
    <p>{{ message }}</p>


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
</style>