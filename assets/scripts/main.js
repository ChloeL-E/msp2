/** 
 * Define the Constants so they can be used in the code
 * */



//Constants for the modal
const modal = document.getElementById("myModal");
const btn = document.getElementById("howToPlayBtn");
const span = document.getElementsByClassName("close")[0];
//Constants for the scoreboard
const score = document.getElementsByClassName("score");
const timer = document.getElementsByClassName("timer");
const playBtn = document.getElementById("playNow");
const resetBtn = document.getElementById("reset");
//Constants in the game
const molehills = [...document.querySelectorAll(".molehill")]
const moles = document.querySelectorAll(".mole");
const plants = document.querySelectorAll(".plant");


// Define the variables
let result = 0;
let gameScore = score;
let gameTimer = 60;
let gameRunning = false;


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


window.onload = function() {
  playGame();
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
  gameRunning = true;
  gameScore = 0;
  gameTimer = 60;
  //moveMole()
  //movePlant()
}




/**
 * function getRandomHill() selects a mole hill at random and places the mole in it
 * only if game running
 */

 function getRandomHill() {
    //if(gameTimer <=0) {
     // gameRunning = false;
      //return;
      //gameOver();
   // } 

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
        return; //gameOver();
      }
    })

}
getRandomHill()




/**
 * function moveMole(){                
 * sets an interval of 1 second between mole moving between hills using getRandomHill()
 */

function moveMole() {
  let moleTimer = null;
  moleTimer = setInterval(getRandomHill, 1000);   
} 
moveMole()


/**
 * function movePlant() {             
 * sets an interval of 1.5 seconds between plant moving using getRandomHill()
 */

function movePlant() {
  let plantTimer = null;
  plantTimer = setInterval(getRandomHill, 1500)
}
movePlant()

/**
 * addScore()
 * adds to score when mole is clicked
 */

function addScore() {
  let clickMoles = document.getElementsByClassName("molehill mole");
  
  clickMoles.forEach((clickMole) => {
    clickMole.addEventListener('click', () => {
    gameScore += 10;
    gameScore.textContent = gameScore;
  });
});
}

/**
 * lossScore()
 * removes points when plant is clicked
 */

/**
 * function checkMoleHillEmpty()  
 * moles and plants can't appear in the same molehill
 */

function checkMoleHillEmpty() {
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