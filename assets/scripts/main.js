/** 
 * use "esversion:6"
 * Define the Constants so they can be used in the code
 */

const modal = document.getElementById("myModal");
const btn = document.getElementById("howToPlayBtn");
const span = document.getElementsByClassName("close");
const gameOverModal = document.getElementById("game-over-modal");
const playAgainBtn = document.getElementById("playAgain");
const storyModal = document.getElementById("storyModal");
const alertModal = document.getElementById("alertModal");
const storyBtn = document.getElementById("storyBtn");
const board = document.querySelector("#board");
const cursor = document.querySelector("#cursor");
const username = document.getElementById("username");
//Constants for the scoreboard
const score = document.getElementById("score");
const timer = document.getElementById("timer");
const playBtn = document.getElementById("playNow");
const resetBtn = document.getElementById("reset");


/**
 * Event listeners for:
 * starting the game when play button clicked
 * Stop and reset the game when reset button is clicked
 */
document.addEventListener("DOMContentLoaded", function () {
  // Check if playBtn exists before adding event listener
  if (playBtn) {
    playBtn.addEventListener("click", playGame);
  }
  // Check if resetBtn exists before adding event listener
  if (resetBtn) {
    resetBtn.addEventListener("click", resetGame);
  }
  // Check if playAgainBtn exists before adding event listener
  if (playAgainBtn) {
    playAgainBtn.addEventListener("click", playGame);
  }
});

/**
 * Using jQuery to play audio when speaker play icon is clicked
 * Change icon to speaker off and pause the audio when speaker off icon is clicked
 * Audio on Home and Play page 
 */

$(document).ready(function () {
  let audioOne = document.getElementById("one");
  let audioTwo = document.getElementById("two");

  $("#pauseOne").hide();
  $("#pauseTwo").hide();

  $("#playOne").click(function () {
    $("#playOne").hide();
    $("#pauseOne").show();
    audioOne.play();
  });

  $("#pauseOne").click(function () {
    $("#playOne").show();
    $("#pauseOne").hide();
    audioOne.pause();
  });

  $("#playTwo").click(function () {
    $("#playTwo").hide();
    $("#pauseTwo").show();
    audioTwo.play();
  });

  $("#pauseTwo").click(function () {
    $("#playTwo").show();
    $("#pauseTwo").hide();
    audioTwo.pause();
  });
});

/**
 * Home page username input form
 * Saves username to session storage until called upon in
 * gameOverPopUp function 
 */
$(document).ready(function () {
  // Listen for click event on the username input field
  $("#submit").click(function () {
    // Get the value of the username input
    let username = $("#username").val();
    // Store username in sessionStorage
    sessionStorage.setItem("username", username);
  });
  // get username from sessionStorage when the document is ready for use later in gameOverPopUp()
  let username = sessionStorage.getItem("username");
});

function validateForm() {
  let x = document.forms["form"]["username"].value;
  if (x == "") {
    //get elements needed to show alert message
    document.getElementById("alert-text").textContent = "Please provide a username!";
    alertModal.style.display = "block";
    return false; //prevent form submission
  };
}

/**
 * How to Play and Story Modal
 * Open the modal with button click
 * Close modal using close button or click anywhere outside the modal within the window
 */
$(document).ready(function () {

  $(btn).click(function () {
    $(modal).show();
  });
  $(span).click(function () {
    $(modal).hide();
  });
  $(storyBtn).click(function () {
    $(storyModal).show();
  });
  $(span).click(function () {
    $(storyModal).hide();
  });
  $(span).click(function () {
    $(alertModal).hide();
  });
  $(window).click(function (event) {
    if (event.target == modal) {
      $(modal).hide();
    } else if (event.target == storyModal) {
      $(storyModal).hide();
    }
  });
});

/**
 * Add image styling to cursor when in play
 * Rotate image 45degrees to simulate a hit
 */
if (board && cursor) {
  board.addEventListener("mousemove", e => {
    cursor.style.top = e.pageY + "px";
    cursor.style.left = e.pageX + "px";
  });
  board.addEventListener("mousedown", () => {
    cursor.classList.add("active");
  });
  board.addEventListener("mouseup", () => {
    cursor.classList.remove("active");
  });
}


