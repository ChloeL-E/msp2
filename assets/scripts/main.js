/** 
 * Define the Constants so they can be used in the code
 * Constants for the modal
 * */
const modal = document.getElementById("myModal");
const btn = document.getElementById("howToPlayBtn");
const span = document.getElementsByClassName("close")[0];
//Constants for the scoreboard
const score = document.getElementsByClassName("score");
const timer = document.getElementsByClassName("timer");
//Constants in the game
const moleHills = document.getElementsByClassName("moleHill");
const moles = document.getElementsByClassName("mole");
const plants = document.getElementsByClassName("plant");


// Define the variables


/**
 * How to Play Modal
 * Open the modal with button click
 * */

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


/**
 * playGame() ensure the game is clear for play
 * firstly check no moles in play
 * set score to 0
 * set timer to 60
 * starts play when play button is clicked
 * moveMole()
 * movePlant()
 */

/**
 * getRandomHill() selects a mole hill at random and places the mole in it
 */

/**
 * function moveMole(){                sets an interval of 1 second between mole moving between hills using getRandomHill()
 * let moleTimer = null
 * moleTimer = setInterval(getRandomHill, 1000)}
 */

/**
 * function movePlant() {             sets an interval of 1.5 seconds between plant moving using getRandomHill()
 * let plantTimer = null;
 * plantTimer = setInterval(getRandomTile, 1500)}
 */

/**
 * function checkMoleHillEmpty()  moles and plants can't appear in the same molehill
 */

/**
 * function updateTimer()
 * 
 */

/**
 * function reset(){   onclick of reset button runs gameOver()
 * gameOver()}
 */

/**
 * function gameOver()
 * sets score back to 0
 * sets timer back to 60
 * clears moles and plants from molehills
 * add pop-up with message informing of score
 */