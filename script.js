'use strict';
//
//document.querySelector('#.score--0')
//selecting elements..
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');

const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

let scores, currentScore, activePlayer, playing, cnt, cnt_1, clicks;

const init = function () {
  //starting conditino
  cnt = 0;
  scores = [0, 0];
  clicks = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;

  diceEl.classList.add('hidden');
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
};
init();

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle('player--active');
  cnt = Number(document.getElementById(`count--${activePlayer}`).innerHTML);
  player1El.classList.toggle('player--active');
};

//rolling the dice functionlity
btnRoll.addEventListener('click', function () {
  //1. genrating a number dice roll..
  if (playing) {
    const dice = Math.trunc(Math.random() * 6) + 1;

    //2.display the dice.
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;
    //console.log(dice);

    //check for rolled 1: if true swtif-tch to next player........
    if (dice != 1) {
      // add dice value to the current score..
      currentScore += dice;
      cnt++;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
      document.getElementById(`count--${activePlayer}`).textContent = cnt;
      //current0El.textContent = currentScore; //chnage later..
    } else {
      //switch to next player
      switchPlayer();
    }
  }
});

btnHold.addEventListener('click', function () {
  if (playing) {
    //1.add current score to active player's score
    scores[activePlayer] += currentScore;
    clicks[activePlayer] = cnt;
    //console.log(scores[activePlayer]);
    //scores[1]=scores[1]+currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    //2.check score is already >=100
    if (scores[activePlayer] >= 100) {
      playing = false;
      diceEl.classList.add('hidden');

      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
      cnt_1 = clicks[activePlayer];
      alert(
        `player--${activePlayer+1} has won the match in ${cnt_1} no of clicks`
      );
    } else {
      switchPlayer();
    }
  }

  //swithc to the next playerrr.....
});
btnNew.addEventListener('click', init);
