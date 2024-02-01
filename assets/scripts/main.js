/** 
 * Define the Constants so they can be used in the code
 * */



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


// Define the variables
let result = 0;
let gameScore = 0;
let gameTimer = 60;
let gameRunning = false;
let moleTimer;
let plantTimer;

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

//resetBtn.addEventListener('click', gameOver)


/**window.onload = function() {
  gameOver();
}

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
  getRandomHill();
  moveMole();
  movePlant();
  addScore();
  lossScore();
}

/**
 * function getRandomHill() selects a mole hill at random and places the mole in it
 * only if game running
 */

 function getRandomHill() {
    molehills.forEach(molehill => {
      molehill.classList.remove("mole");
      molehill.classList.remove("plant");
    });

    let randomHill = molehills[Math.floor(Math.random() * 9)];
    randomHill.classList.add("mole");

    let randomPlant = molehills[Math.floor(Math.random() * 9)]
    randomPlant.classList.add("plant");

    setTimeout(() => {
      if(gameTimer <= 0) {
        gameRunning = false;
        clearInterval(moleTimer);
        clearInterval(plantTimer);
      }
    }, 500);
}
//getRandomHill()

/**
 * function moveMole(){                
 * sets an interval of 1 second between mole moving between hills using getRandomHill()
 */

function moveMole() {
  clearInterval(moleTimer);
  moleTimer = null;
  moleTimer = setInterval(getRandomHill, 1500);
} 
//moveMole()


/**
 * function movePlant() {             
 * sets an interval of 1.5 seconds between plant moving using getRandomHill()
 */

function movePlant() {
  clearInterval(plantTimer);
  plantTimer = null;
  plantTimer = setInterval(getRandomHill, 2000);
}
//movePlant()

/**
 * addScore()
 * adds to score when mole is clicked
 */

function addScore() {
  let clickMoles = document.getElementsByClassName("molehill mole");
  Array.from(clickMoles).forEach((clickMole) => {
    clickMole.addEventListener('click', () => {
      console.log("clicked a mole");
      gameScore += 10;
      score.textContent = gameScore;
      moveMole();
    });
  });
}
//addScore();


/**
 * lossScore()
 * removes points when plant is clicked
 */

function lossScore() {
  let clickPlants = document.getElementsByClassName("molehill plant");
  Array.from(clickPlants).forEach((clickPlant) => {
    clickPlant.addEventListener('click', () => {
      console.log("clicked a plant");
      gameScore --;
      score.textContent = gameScore;
      movePlant();
    });
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


/**
 * function gameOver()
 * sets score back to 0
 * sets timer back to 60
 * clears moles and plants from molehills
 * add pop-up with message informing of score
 */

// module.exports = {}