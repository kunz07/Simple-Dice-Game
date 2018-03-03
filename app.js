var scores, activePlayer, roundScore, gameOver, prevDice, winningScore, valid;

init();

function checkScore() {
  valid = true;
  var score = document.querySelector('#score').value;
  if (score < 20) {
    document.querySelector('#message').textContent = 'Number too Low';
    valid = false;
  }
  return valid;
}

function checkWinner() {
  if (scores[activePlayer] >= winningScore) {
    gameOver = true;
    var winner = document.querySelector('#name-' + activePlayer);
    winner.textContent = 'WINNER!';
    winner.classList.add('winner');

    document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');

    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');

    return true;
  }
}

function init() {
  scores = [0, 0];
  activePlayer = 0;
  roundScore = 0;
  gameOver = false;
  prevDice = 0;

  if (checkScore()) {
    winningScore = document.getElementById('score').value;
    console.log(winningScore);
  }

  document.querySelector('.dice').style.display = 'none';
  document.querySelector('#score-0').textContent = 0;
  document.querySelector('#current-0').textContent = 0;
  document.querySelector('#score-1').textContent = 0;
  document.querySelector('#current-1').textContent = 0;

  var player0 = document.querySelector('.player-0-panel');
  player0.classList.remove('active');
  player0.classList.remove('winner');

  var player1 = document.querySelector('.player-1-panel');
  player1.classList.remove('active');
  player1.classList.remove('winner');

  document.querySelector('#name-0').classList.remove('winner');
  document.querySelector('#name-1').classList.remove('winner')

  document.querySelector('#name-0').textContent = 'Player 0';
  document.querySelector('#name-1').textContent = 'Player 1';

  if (valid) {
    activePlayer = firstplay();
    document.querySelector('.player-' + activePlayer + '-panel').classList.add('active');
    document.querySelector('#message').textContent = " ";
  }
}

function firstplay() {
  return Math.floor(Math.random() + 0.5);
}

function Dice() {
  var dice = Math.floor(Math.random() * 6) + 1;
  var diceImage = document.querySelector('.dice');
  diceImage.style.display = 'block';
  diceImage.src = 'dice-' + dice + '.png';
  return dice;
}

function changePlayer() {
  document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
  document.querySelector('#current-' + activePlayer).textContent = 0;
  activePlayer = activePlayer ? 0 : 1;
  document.querySelector('.player-' + activePlayer + '-panel').classList.add('active');
}

document.querySelector('.btn-new').addEventListener('click', init);

document.querySelector('.btn-hold').addEventListener('click', function() {
    if (!gameOver && valid) {
      scores[activePlayer] += roundScore;
      document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
      document.querySelector('.dice').style.display = 'none';

      if (!checkWinner()) {
        roundScore = 0;
        prevDice = 0;
        changePlayer();
      }
    }
})

document.querySelector('.btn-roll').addEventListener('click', function () {
  if (!gameOver && valid) {
    var dice = Dice();

    if (prevDice === 6 && dice === 6) {
      scores[activePlayer] = 0;
      document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
      document.querySelector('#message').textContent = "Oops! Player " + activePlayer + " rolled 2 sixes!";
      roundScore = 0;
      changePlayer();
    } else if (dice != 1) {
      roundScore += dice;
      document.querySelector('#current-' + activePlayer).textContent = roundScore;
      document.querySelector('#message').textContent = "";
    } else {
      roundScore = 0;
      document.querySelector('#current-' + activePlayer).textContent = 0;
      document.querySelector('#message').textContent = "Oops! Player " + activePlayer + " rolled a one!"
      changePlayer();
    }
    prevDice = dice;
  }
});
