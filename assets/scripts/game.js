/** 
 * use "esversion:6"
 * Define the Constants so they can be used in the code
 */

//Pull in elements from the DOM
//Constants in the game
const molehills = [...document.querySelectorAll(".molehill")];

// Globally define the variables

let gameScore = 0;
let gameTimer;
let timerId;
let gameRunning = false;
let moleTimer;
let plantTimer;
let hitMole = getRandomMoleHill.id;
let hitPlant = getRandomPlantHill.id;


/**
 * playGame() ensure the game is clear for play
 * set score to 0
 * set timer to 30
 * starts play when play button is clicked
 * runs game functions
 */
function playGame() {
  gameRunning = true;
  gameScore = 0;
  gameTimer = 30;
  score.textContent = gameScore;
  timer.textContent = gameTimer;
  getRandomMoleHill();
  getRandomPlantHill();
  checkMoleHillEmpty();
  moveMole();
  movePlant();
  scoreCalculator();
  updateTimer();
  gameOver();
  $("#game-over-modal").hide();
}


/**
 * function getRandomHill() 
 * selects a mole hill at random and places the mole in it
 * only if game is running
 */
function getRandomMoleHill() {
  molehills.forEach(molehill => { //if class of mole, remove
    molehill.classList.remove("mole");
  });

  let randomHill = molehills[Math.floor(Math.random() * 9)]; //get random number 0-8 and add class mole
  randomHill.classList.add("mole");

  setTimeout(() => { //when timer reaches 0, game over and clear timer and game over
    if (gameTimer == 0 && gameRunning) {
      gameRunning = false;
      clearInterval(moleTimer);
      gameOver();
    }
  }, 1000);
}


/**
 * clears interval and timer               
 * sets an interval of 1 second between mole moving between hills using getRandomHill()
 */
function moveMole() {
  clearInterval(moleTimer); //clear timer interval
  moleTimer = null; //set timer to null
  moleTimer = setInterval(getRandomMoleHill, 2000); // call getRandomMoleHill every 2s
}


/** 
 * function getRandomPlantHill
 * get a random number 0-8 and applies the plants class every 2s
*/
function getRandomPlantHill() {
  molehills.forEach(molehill => { //if class of plant, remove
    molehill.classList.remove("plant");
  });

  let randomPlant = molehills[Math.floor(Math.random() * 9)]; //get random number 0-8 and add class plant
  randomPlant.classList.add("plant");

  setTimeout(() => { //when timer reaches 0, clear timers and game over
    if (gameTimer == 0) {
      gameRunning = false;
      clearInterval(plantTimer);
      gameOver();
    }
  }, 1000);
}


/**
 * clears interval and timer        
 * sets an interval of 1.5 seconds between plant moving using getRandomHill()
 */
function movePlant() {
  clearInterval(plantTimer); //clear timer interval
  plantTimer = null; //sets timer to null
  plantTimer = setInterval(getRandomPlantHill, 2500); //call getRandomHill every 2.5s
}

/**
 * Function to listen for click on molehill and then run scoreHandler function
 */
function scoreCalculator() {
  molehills.forEach(molehill => {
    molehill.addEventListener("click", scoreHandler);
  });
}


/**
 * Function to add/depreciate score depending if plant or mole hit
 * Click a plant, -10points from gamescore, update scoreboard, initiate a new random plant
 * Click a mole, +10 points to gamescore, update scoreboard, initiate a new random mole
 */
function scoreHandler() {
  const clickedMoleHillId = this.id;
  const clickedMoleHill = document.getElementById(clickedMoleHillId);

  if (clickedMoleHill.classList.contains("plant")) {
    gameScore -= 10;
    score.textContent = gameScore;
    getRandomPlantHill();
  }
  else if (clickedMoleHill.classList.contains("mole")) {
    gameScore += 10;
    score.textContent = gameScore;
    getRandomMoleHill();
  }
}


/**
 * function checkMoleHillEmpty()  
 * moles and plants can't appear in the same molehill - collision avoidance
 */
function checkMoleHillEmpty() {
  if (molehills.id === hitPlant) { //if the id on molehill matches that of hitPlant then plant is in play, move the mole
    moveMole();
  } else if (molehills.id === hitMole) { //if the id on molehill matches hitMole, then a mole is in play, move the plant
    movePlant();
  }
}

/**
 * function updateTimer()
 * counts down from 30 to 0
 * game ends when timer reaches 0
 */
function updateTimer() {
  clearInterval(timerId);
  // timer reduces by 1 in increments of 1s and updates the gameTimer
  timerId = setInterval(() => {
    gameTimer--;
    timer.textContent = gameTimer;
    //when timer reaches 0 the game ends, gameOver function called
    if (gameTimer == 0) {
      clearInterval(timerId); //clears timer to stop it counting down
      gameRunning = false;
      gameOver();
    }
  }, 1000);
}

/**
 * Reset game
 * resets game if reset button is clicked
 * or
 * when timer reaches 0
 * resets the game play- score to 0, timer to 30s, clears all intervals and removes moles and plants from game board
 */
function resetGame() {
  resetBtn.addEventListener("click", () => {
    gameRunning = false;
    //reset score and timer
    gameScore = 0;
    gameTimer = 30;
    score.textContent = gameScore;
    timer.textContent = gameTimer;
    clearInterval(timerId);
    clearInterval(moleTimer);
    clearInterval(plantTimer);
    //reset game board
    molehills.forEach(molehill => { //if class of mole or plant on board, remove
      molehill.classList.remove("mole");
      molehill.classList.remove("plant");
    });
    return;
  });
}


/**
 * function gameOver()
 * sets score back to 0
 * sets timer back to 30
 * clears moles and plants from molehills
 * add pop-up with message informing of score
 */
function gameOver() {
  if (gameTimer == 0) {
    clearInterval(timerId);
    clearInterval(moleTimer);
    clearInterval(plantTimer);
    molehills.forEach(molehill => { //if class of mole or plant, remove
      molehill.classList.remove("mole");
      molehill.classList.remove("plant");
    });
    gameRunning = false;
    score.textContent = gameScore;
    timer.textContent = gameTimer;
    gameOverPopUp();
  }
}

/** gameOverModal shows when game is ended - runs within the gameOver function
 * there are two different messages depending on the score. Placeholders within template literals used to
 * put the username and gameScore into the message.
 */
function gameOverPopUp() {
  //storing message into variable, to be shown in game-over-modal
  let gameOverMessage = $("#modalText");

  //get the username data stores in sessionStorage
  let username = sessionStorage.getItem("username");
  if (!username) {
    // Set username to "friend" if it's empty
    username = "friend";
  }

  if (gameScore > 0) {
    //placeholders for username and gamescore included in game over message
    //gameover message if score >0
    gameOverMessage.text(`Well Done ${username}! You outsmarted the moles and scored ${gameScore} points! Can you try and beat your
     score to help out Farmer John again?`);

    //game over message if score <0
  } else if (gameScore <= 0) {
    gameOverMessage.text(`Uh Oh ${username}. You scored ${gameScore} points. Those pesky moles got away from you this time. Farmer 
    John still needs your help! Can you try and beat your score? `);
  }
  $("#game-over-modal").show();
}


