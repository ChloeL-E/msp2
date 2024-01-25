// Set the const

// Set the let variables

// Get the hamburger menu and navmenu
const hamburger = document.querySelector(".navbar-toggler");
const navMenu = document.querySelector(".navbar");

hamburger.addEventListener("click", () => {
    console.log("Hamburger click");
    hamburger.classList.toggle("active");
    navMenu.classList.toggle("active");
})

document.querySelectorAll(".navbar").forEach(n => n.addEventListener("click", () => {
  console.log("Document click");
  hamburger.classList.remove("active");
  navMenu.classList.remove("active");
}))

  // Get the modal
  const modal = document.getElementById("myModal");
  
  // Get the button that opens the modal
  const btn = document.getElementById("howToPlayBtn");
  
  // Get the <span> element that closes the modal
  const span = document.getElementsByClassName("close")[0];
  
  // When the user clicks the button, open the modal 
  btn.onclick = function() {
    modal.style.display = "block";
  }
  
  // When the user clicks on <span> (x), close the modal
  span.onclick = function() {
    modal.style.display = "none";
  }
  
  // When the user clicks anywhere outside of the modal, close it
  window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  }

