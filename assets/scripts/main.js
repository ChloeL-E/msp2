/** 
 * Define the Constants so they can be used in the code
 * */



//Pull in elements from the DOM
//Constants for the modal
const modal = document.getElementById("myModal");
const btn = document.getElementById("howToPlayBtn");
const span = document.getElementsByClassName("close")[0];
//Constants for the scoreboard
const score = document.getElementById("score");
const timer = document.getElementById("timer");
const playBtn = document.getElementById("playNow");
const resetBtn = document.getElementById("reset");
//Constants in the game
const molehills = [...document.querySelectorAll(".molehill")]
const moles = document.querySelectorAll(".mole");
const plants = document.querySelectorAll(".plant");


// Globally define the variables
let result = 0;
let gameScore = 0;
let gameTimer;
let timerId;
let gameRunning = false;
let moleTimer;
let plantTimer;
let clickMoles;
let hitMole = getRandomMoleHill.id;
let hitPlant = getRandomPlantHill.id;


/**
 * How to Play Modal
 * Open the modal with button click
 **/

btn.onclick = function () {
  modal.style.display = "block";
}
// Close the modal by clicking the (x) or anywhere outside the modal
span.onclick = function () {
  modal.style.display = "none";
}
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

/**
 * Event listeners for:
 * starting the game when play button clicked
 * Stop and reset the game when reset button is clicked
 */

playBtn.addEventListener('click', playGame);
resetBtn.addEventListener('click', resetGame);

//window.onload = function () {
//  resetGame();
//}

/**
 * playGame() ensure the game is clear for play
 * firstly check no moles in play
 * set score to 0
 * set timer to 60
 * starts play when play button is clicked
 * moveMole()
 * movePlant()
 */

function playGame() {
  //check no moles are in play
  gameRunning = true;
  gameScore = 0;
  gameTimer = 60;
  score.textContent = gameScore;
  timer.textContent = gameTimer;
  getRandomMoleHill();
  getRandomPlantHill();
  moveMole();
  movePlant();
  addScore();
  lossScore();
  updateTimer();
  gameOver();
}

/**
 * function getRandomHill() selects a mole hill at random and places the mole in it
 * only if game running
 */

function getRandomMoleHill() {
  molehills.forEach(molehill => { //if class of mole or plant, remove
    molehill.classList.remove("mole");
  });

  let randomHill = molehills[Math.floor(Math.random() * 9)]; //get random number 0-8 and add class mole
  randomHill.classList.add("mole");

  setTimeout(() => { //when timer reaches 0, game over and clear timer and game over
    if (gameTimer == 0) {
      gameRunning = false;
      clearInterval(moleTimer);
      gameOver();
    }
  }, 500);
}

/**
 * function moveMole(){                
 * sets an interval of 1 second between mole moving between hills using getRandomHill()
 */

function moveMole() {
  clearInterval(moleTimer); //clear timer interval
  moleTimer = null; //set timer to null
  moleTimer = setInterval(getRandomMoleHill, 1500); // call getRandomHill every 1.5s
}

/** 
 * get a random number 0-8 and applies the plants class every 2.5s
*/

function getRandomPlantHill() {
  molehills.forEach(molehill => { //if class of mole or plant, remove
    molehill.classList.remove("plant");
  });

  let randomPlant = molehills[Math.floor(Math.random() * 9)] //get random number 0-8 and add class plant
  randomPlant.classList.add("plant");

  setTimeout(() => { //when timer reaches 0, game over and clear timers and game over
    if (gameTimer == 0) {
      gameRunning = false;
      clearInterval(plantTimer);
      gameOver();
    }
  }, 500);
}


/**
 * function movePlant() {             
 * sets an interval of 1.5 seconds between plant moving using getRandomHill()
 */

function movePlant() {
  clearInterval(plantTimer); //clear timer interval
  plantTimer = null; //sets timer to null
  plantTimer = setInterval(getRandomPlantHill, 2500); //call getRandomHill every 2s
}

/**
 * addScore()
 * adds to score when mole is clicked
 */

function addScore() {
  clickMoles = document.getElementsByClassName("molehill mole");
  Array.from(clickMoles).forEach((clickMole) => {
    clickMole.addEventListener('mousedown', () => {
      if(molehills.id == hitMole.id) {
      console.log("you got a mole");
      gameScore += 10;
      score.textContent = gameScore;
      hitMole = null;
      }
    });
    moveMole();
  });
}

/**
 * lossScore()
 * removes points when plant is clicked
 */

function lossScore() {
  let clickPlants = document.getElementsByClassName("molehill plant");
  Array.from(clickPlants).forEach((clickPlant) => {
    clickPlant.addEventListener('mousedown', () => {
      console.log("clicked a plant");
      gameScore -= 10;
      score.textContent = gameScore;
    });
    movePlant();
  });
}
//lossScore();

/**
 * function checkMoleHillEmpty()  
 * moles and plants can't appear in the same molehill
 */

/**function checkMoleHillEmpty() {
  if(!moles && !plants)
}


/**
 * function updateTimer()
 * 
 */

function updateTimer() {
  clearInterval(timerId);
  // timer reduces by 1 in increments of 1s and updates the gameTimer
  timerId = setInterval(() => {
    gameTimer--;
    timer.textContent = gameTimer;
    //when timer reaches 0 the game ends, gameOver function called
    if (gameTimer == 0) {
      clearInterval(timerId);
      gameRunning = false;
      gameOver();
    }
  }, 1000);
}

/**
 * Reset game
 */

function resetGame() {
  resetBtn.addEventListener("click", () => {
    gameRunning = false;
    //reset score and timer
    gameScore = 0;
    gameTimer = 60;
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
  })
}


/**
 * function gameOver()
 * sets score back to 0
 * sets timer back to 60
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
  }
}


// module.exports = {}