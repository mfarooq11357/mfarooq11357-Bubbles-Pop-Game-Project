let hit;
let timerInterval;
let score = 0;

// Function to start the game
function startGame() {
  makeBubble();
  newHit();
  timerCount();
  score = 0;
}

// Function to create bubbles
function makeBubble() {
  let cluster = ``;
  for (let i = 0; i < 150; i++) {
    let a = Math.floor(Math.random() * 10);
    cluster += `<div class="sphere">${a}</div> `;
  }
  document.querySelector("#lower").innerHTML = cluster;
}

// Function to generate a new hit number
function newHit() {
  hit = Math.floor(Math.random() * 10);
  document.querySelector("#hit").textContent = hit;
}

// Function to update and display the score
function scoreAdd() {
  score += 10;
  document.querySelector("#score").textContent = score;
}

// Function to start the timer
function timerCount() {
  let timer = 60;
  timerInterval = setInterval(function () {
    timer--;
    document.querySelector("#timer").textContent = timer;
    if (timer === 0) {
      clearInterval(timerInterval);
      endGame();
    }
  }, 1000);
}

// Function to handle click events on bubble
function handleBubbleClick(event) {
  let clickedNumber = Number(event.target.textContent);
  if (clickedNumber === hit) {
    scoreAdd();
    newHit();
    makeBubble();
  }
}

// Function to display the game over screen
function endGame() {
  saveScore();
  document.querySelector("#upper").innerHTML = ``;
  document.querySelector("#lower").innerHTML = `
  <div id="game-over" >
    <h1 style="font-size: 45px;" >Game Over</h1>
    <p id="final-score">Final Score: ${score}</p>
    <button id="restart-button">Restart</button>
  </div>
  `;
  initEventListeners();
}

// Function to update the upper HTML section
function upperhtml() {
  document.querySelector("#upper").innerHTML = `
    <div class="class">Hit
      <div id="hit" class="box"></div>
    </div>
    <div class="class">Timer
      <div id="timer" class="box"></div>
    </div>
    <div class="class">Score
      <div id="score" class="box"></div>
    </div>`;
}

// Function to save the score in local storage
function saveScore() {
  let scores = JSON.parse(localStorage.getItem("scores")) || [];
  scores.push(score);
  localStorage.setItem("scores", JSON.stringify(scores));
}

// Function to retrieve and display the score history
function getScoreHistory() {
  let scores = JSON.parse(localStorage.getItem("scores")) || [];
  scores.sort((a, b) => b - a); // Sort scores in descending order
  let topScores = scores.slice(0, 10); // Get the top 10 scores

  let scoreHistory = topScores.map((score, index) => `<li>Game ${index + 1}: ${score}</li>`).join("");
  document.querySelector("#lower").innerHTML = `<div class="pre-history">
  <h2>Latest Game History</h2>
  <ul>${scoreHistory}</ul>
  <button id="go-back">Back</button>
  </div>`;
  
  initEventListeners();
}



// Function to initialize event listeners
function initEventListeners() {
  document.querySelector("#lower").removeEventListener("click", handleBubbleClick);
  document.querySelector("#lower").addEventListener("click", handleBubbleClick);
  
  document.querySelector("#play-button")?.addEventListener("click", function () {
    upperhtml();
    startGame();
    initEventListeners();
  });
  
  document.querySelector("#score-history")?.addEventListener("click", function () {
    getScoreHistory();
  });

  document.querySelector("#Instruction")?.addEventListener("click", function () {
    document.querySelector("#lower").innerHTML = `<div id="instructions" class="modal">
        <div class="modal-content">
            <span class="close">&times;</span>
            <h2>Game Instructions</h2>
            <p>1) Hit is the target bubble you have to pop to increase your score.</p>
            <p>2) One targeted bubble hitting successfully will give you addition of 10 points.</p>
            <p>3) Total time to play one game is 60 seconds.</p>
            <p>4) You can continuously track your high score status too.</p>
            <p>5) Happy Gaming!</p>
        </div>
        <button id="go-back">Back</button>
    </div>`;
    initEventListeners();
  });

  document.querySelector("#go-back")?.addEventListener("click", function () {
    document.querySelector("#lower").innerHTML = `
                 <div class="gdhduhdebx">
                <h1>Welcome To Bubble Pop Game</h1>
                <div class="buttons">
                <button id="play-button">Play Now</button>
                <button id="score-history">Score History</button>
                <button id="Instruction">Instructions</button>
            </div>
        </div>`;
    initEventListeners();
  });

  document.querySelector("#restart-button")?.addEventListener("click", function () {
    upperhtml();
    startGame();
    initEventListeners();
  });
}

// Initial setup of event listeners
initEventListeners();

