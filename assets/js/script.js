//Wait for the DOM to finish loading before running the game
//Get the button elements and add event listeners to them

let easyGame = []
let mediumGame = []
let hardGame = []

let easyGameSolution = []
let mediumGameSolution = []
let hardGameSolution = []

document.addEventListener("DOMContentLoaded", function() {
    let userLogin = document.getElementById("login");
    let instructionsManual = document.getElementById("instructions");
    let highScores = document.getElementById("personal-best");
    let playButton = document.getElementById("play");
    let resetButton = document.getElementById("reset");

    userLogin.addEventListener("click", function() {
        loginUser();
    })

    instructionsManual.addEventListener("click", function() {
        displayInstructions();
    })

    highScores.addEventListener("click", function() {
        viewHighScores();
    })

    playButton.addEventListener("click", function() {
        runGame();
    })

    resetButton.addEventListener("click", function() {
        resetGame();
    })
})