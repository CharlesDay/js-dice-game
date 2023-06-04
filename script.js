'use strict';

let score0Element = document.getElementById('score--0');
let score1Element = document.getElementById('score--1');
let player0Element = document.querySelector('.player--0');
let player1Element = document.querySelector('.player--1');
let diceElement = document.querySelector('.dice');
let diceRoleElement = document.querySelector('.btn--roll');
let diceHoldElement = document.querySelector('.btn--hold');
let diceNewGameElement = document.querySelector('.btn--new');
let current0 = document.getElementById('current--0');
let current1 = document.getElementById('current--1');

let currentPlayer = 0;
let currentScore = 0;

let playing;

resetGame();

function resetGame() {
  currentPlayer = 0;
  playing = true;
  score0Element.textContent = 0;
  score1Element.textContent = 0;
  currentScore = 0;
  current0.textContent = 0;
  current1.textContent = 0;
  diceElement.classList.add('hidden');
  player0Element.classList.remove('player--winner');
  player1Element.classList.remove('player--winner');
  player0Element.classList.add('player--active');
  player1Element.classList.remove('player-active');
}

diceRoleElement.addEventListener('click', rollDice);
diceHoldElement.addEventListener('click', hold);
diceNewGameElement.addEventListener('click', resetGame);

function rollDice() {
  if (playing) {
    const diceRoll = Math.trunc(Math.random() * 6) + 1;
    diceElement.classList.remove('hidden');
    diceElement.src = `dice-${diceRoll}.png`;
    if (diceRoll === 1) {
      switchPlayer();
    } else {
      currentScore += diceRoll;
      document.getElementById(`current--${currentPlayer}`).textContent =
        currentScore;
    }
  }
}

function switchPlayer() {
  document.getElementById(`current--${currentPlayer}`).textContent = 0;
  currentScore = 0;
  currentPlayer = currentPlayer === 0 ? 1 : 0;
  player0Element.classList.toggle('player--active');
  player1Element.classList.toggle('player--active');
}

function addScoreToPlayer() {
  if (currentPlayer === player0) {
    current0.textContent = currentScore;
  } else {
    current1.textContent = currentScore;
  }
}

function hold() {
  if (currentPlayer === 0) {
    score0Element.textContent =
      Number(score0Element.textContent) + currentScore;
    if (Number(score0Element.textContent) >= 50) {
      document.querySelector('.player--0').classList.add('player--winner');
      player0Element.classList.remove('player--active');
      playing = false;
    } else switchPlayer();
  } else {
    score1Element.textContent =
      Number(score1Element.textContent) + currentScore;
    if (Number(score1Element.textContent) >= 10) {
      document.querySelector('.player--1').classList.add('player--winner');
      player1Element.classList.remove('player--active');
      playing = false;
    } else switchPlayer();
  }
}
