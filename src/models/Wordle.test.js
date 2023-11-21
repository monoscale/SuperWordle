import { expect, test } from 'vitest'
import { Wordle } from './Wordle';
import { WordleCharacterState } from './WordleCharacterState';

test('Correct guess completes wordle', () => {
    let wordle = new Wordle('STONE');
    wordle.setCharacterGuess('S');
    wordle.setCharacterGuess('T');
    wordle.setCharacterGuess('O');
    wordle.setCharacterGuess('N');
    wordle.setCharacterGuess('E');
    wordle.checkGuess();
    expect(wordle.completed).toBe(true);
})

test('Guess with multiple duplicate characters only marks one correct and other absent', () => {
    let wordle = new Wordle('STONE');
    wordle.setCharacterGuess('P');
    wordle.setCharacterGuess('E');
    wordle.setCharacterGuess('N');
    wordle.setCharacterGuess('N');
    wordle.setCharacterGuess('Y');
    wordle.checkGuess();
    let guess = wordle.guesses[0];
    expect(guess.characters[0].state).toBe(WordleCharacterState.ABSENT);
    expect(guess.characters[1].state).toBe(WordleCharacterState.PRESENT);
    expect(guess.characters[2].state).toBe(WordleCharacterState.ABSENT);
    expect(guess.characters[3].state).toBe(WordleCharacterState.CORRECT);
    expect(guess.characters[4].state).toBe(WordleCharacterState.ABSENT);
})

test('Guess with multiple duplicate characters only marks one present and other absent', () => {
    let wordle = new Wordle('STONE');
    wordle.setCharacterGuess('N');
    wordle.setCharacterGuess('Y');
    wordle.setCharacterGuess('N');
    wordle.setCharacterGuess('E');
    wordle.setCharacterGuess('T');
    wordle.checkGuess();
    let guess = wordle.guesses[0];
    expect(guess.characters[0].state).toBe(WordleCharacterState.PRESENT);
    expect(guess.characters[1].state).toBe(WordleCharacterState.ABSENT);
    expect(guess.characters[2].state).toBe(WordleCharacterState.ABSENT);
    expect(guess.characters[3].state).toBe(WordleCharacterState.PRESENT);
    expect(guess.characters[4].state).toBe(WordleCharacterState.PRESENT);
})