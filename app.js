var scores, roundScore, activePlayer, gamePlaying, FINALSCORE=100;



newGame();

function nextPlayer() {
  roundScore = 0;
  document.querySelector(".player-" + activePlayer + "-panel").classList.toggle("active");
  activePlayer === 0 ? (activePlayer = 1) : (activePlayer = 0);
  document.querySelector(".player-" + activePlayer + "-panel").classList.toggle("active");
  document.querySelector(".dice").style.display = "none";
}

function setWinner(){
    document.getElementById("name-" + activePlayer).textContent = "Winner!!";
    document.querySelector(".player-" + activePlayer + "-panel").classList.remove("active");
    document.querySelector(".player-" + activePlayer + "-panel").classList.add("winner");
    document.querySelector(".dice").style.display = "none";
    gamePlaying = false;
}

function newGame() {
    
    scores = [0, 0];
    roundScore = 0;
    activePlayer = 0;
    gamePlaying = true;

    document.querySelector(".dice").style.display = "none";
    
    document.getElementById("score-0").textContent = "0";
    document.getElementById("score-1").textContent = "0";
    document.getElementById("current-0").textContent = "0";
    document.getElementById("current-1").textContent = "0";
    document.getElementById("name-0").textContent = "Player 1";
    document.getElementById("name-1").textContent = "Player 2";
    
    document.querySelector(".player-0-panel").classList.remove("active");
    document.querySelector(".player-0-panel").classList.remove("winner");
    document.querySelector(".player-1-panel").classList.remove("active");
    document.querySelector(".player-1-panel").classList.remove("winner");

    document.querySelector(".player-0-panel").classList.add("active");
}

document.querySelector(".btn-roll").addEventListener("click", function() {
  if(gamePlaying){
    var dice = Math.floor(Math.random() * 6) + 1;
    document.querySelector(".dice").style.display = "block";
    document.querySelector(".dice").src = "dice-" + dice + ".png";
  
    document.getElementById("current-" + activePlayer).innerHTML = (function(diceValue) {
      if (diceValue !== 1) {
        roundScore += diceValue;
        return roundScore;
      } else {
        nextPlayer();
        return roundScore;
      }
    })(dice);
  }
});

document.querySelector(".btn-hold").addEventListener("click", function() {
    if(gamePlaying){
        if(roundScore > 0){
            scores[activePlayer] = scores[activePlayer] + roundScore;
            document.getElementById("score-" + activePlayer).innerHTML = scores[activePlayer];
            scores[activePlayer] >= FINALSCORE ? setWinner() : nextPlayer();
        }
    }
});

document.querySelector(".btn-new").addEventListener("click", newGame);
