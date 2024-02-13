/** 
 * Define the Constants so they can be used in the code
 */

//Pull in elements from the DOM
//Constants for the modal
const modal = document.getElementById("myModal");
const btn = document.getElementById("howToPlayBtn");
const span = document.getElementsByClassName("close")[0];
const gameOverModal = document.getElementById("game-over-modal");
const playAgainBtn = document.getElementById("playAgain")

//Constants for the scoreboard
const score = document.getElementById("score");
const timer = document.getElementById("timer");
const playBtn = document.getElementById("playNow");
const resetBtn = document.getElementById("reset");
//Constants in the game
const molehills = [...document.querySelectorAll(".molehill")];
const cursor = document.querySelector(".cursor");
const board = document.querySelector("#board");
//const moles = document.querySelectorAll(".mole");
//const plants = document.querySelectorAll(".plant");


// Globally define the variables
//let result = 0;
let gameScore = 0;
let gameTimer;
let timerId;
let gameRunning = false;
let moleTimer;
let plantTimer;
//let clickMoles = [];
//let clickPlants = [];
let hitMole = getRandomMoleHill.id;
let hitPlant = getRandomPlantHill.id;

/**
 * Using jQuery to play audio when speaker play icon is clicked
 * Change icon to speaker off and pause the audio when speaker off icon is clicked
 * Home page audio
 */

$(document).ready(function () {
  let audioOne = document.getElementById("one");
  let audioTwo = document.getElementById("two");

  $('#pauseOne').hide();
  $('#pauseTwo').hide();

  $('#playOne').click(function () {
    $('#playOne').hide();
    $('#pauseOne').show();
    audioOne.play();
  });

  $('#pauseOne').click(function () {
    $('#playOne').show();
    $('#pauseOne').hide();
    audioOne.pause();
  });

  $('#playTwo').click(function () {
    $('#playTwo').hide();
    $('#pauseTwo').show();
    audioTwo.play();
  });

  $('#pauseTwo').click(function () {
    $('#playTwo').show();
    $('#pauseTwo').hide();
    audioTwo.pause();
  });
});


/**
 * How to Play Modal
 * Open the modal with button click
 */

btn.onclick = function () {
  modal.style.display = "block";
};
// Close the modal by clicking the (x) or anywhere outside the modal
span.onclick = function () {
  modal.style.display = "none";
};
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};

/**
 * How to Play storyModal
 * Open the modal with button click
 */
const storyModal = document.getElementById("storyModal");
const storyBtn = document.getElementById("storyBtn");
const storyClose = document.getElementId("storyClose");

storyBtn.onclick = function () {
  storyModal.style.display = "block";
};
// Close the modal by clicking the (x) or anywhere outside the modal
storyClose.onclick = function () {
  console.log('story button click');
  storyModal.style.display = "none";
};
window.onclick = function (event) {
  if (event.target == storyModal) {
    storyModal.style.display = "none";
  }
};


board.addEventListener('mousemove', e => {
  cursor.style.top = e.pageY + 'px';
  cursor.style.left = e.pageX + 'px';
});
board.addEventListener('mousedown', () => {
  cursor.classList.add("active");
});
board.addEventListener('mouseup', () => {
  cursor.classList.remove("active");
});

/**
 * Event listeners for:
 * starting the game when play button clicked
 * Stop and reset the game when reset button is clicked
 */

playBtn.addEventListener('click', playGame);
resetBtn.addEventListener('click', resetGame);
playAgainBtn.addEventListener('click', playGame);

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
  $('#game-over-modal').hide();
}

/**
 * function getRandomHill() 
 * selects a mole hill at random and places the mole in it
 * only if game running
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
 * function moveMole(){                
 * sets an interval of 1 second between mole moving between hills using getRandomHill()
 */

function moveMole() {
  clearInterval(moleTimer); //clear timer interval
  moleTimer = null; //set timer to null
  moleTimer = setInterval(getRandomMoleHill, 1000); // call getRandomMoleHill every 1s
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
 * function movePlant() {             
 * sets an interval of 1.5 seconds between plant moving using getRandomHill()
 */

function movePlant() {
  clearInterval(plantTimer); //clear timer interval
  plantTimer = null; //sets timer to null
  plantTimer = setInterval(getRandomPlantHill, 2000); //call getRandomHill every 2s
}

function scoreCalculator() {
  molehills.forEach(molehill => {
    molehill.addEventListener('click', scoreHandler);
  });
}

function scoreHandler() {
  const clickedMoleHillId = this.id;
  const clickedMoleHill = document.getElementById(clickedMoleHillId);

  if (clickedMoleHill.classList.contains("plant")) {
    console.log('you got a plant');
    gameScore -= 10;
    score.textContent = gameScore;
    //clearInterval(plantTimer); //clear timer and hitPlant variable
    //hitPlant = null;
    getRandomPlantHill();
  }
  else if (clickedMoleHill.classList.contains("mole")) {
    console.log('you got a mole');
    gameScore += 10;
    score.textContent = gameScore;
    //clearInterval(moleTimer); //clear timer and hitMole variable
    // hitMole = null;
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
  };
}

/** gameOverModal pops up when game is ended - runs within the gameOver function
 * there are two different messages depending on the score. Template literals used 
 * to insert the gameScore into the string.
 */
function gameOverPopUp() {

  let gameOverMessage = document.getElementById("modalText");
  if (gameScore > 0) {
    gameOverMessage.textContent = `Well Done! You outsmarted the moles and scored ${gameScore}! Can you try and beat your
     score to help out Farmer John again?`
  } else if (gameScore <= 0) {
    gameOverMessage.textContent = `Uh Oh. You scored ${gameScore}. Those pesky moles got away from you this time. Farmer 
    John still needs your help! Can you try and beat your score? `
  };
  $('#game-over-modal').show();
};

// module.exports = {}