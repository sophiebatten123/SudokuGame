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

// User login section of the website allowing credentials to be entered by the user
function loginUser() {
    alert("Login")
}

// Instructions section will display instructions to the user upon click
function displayInstructions() {
    alert("Instructions")
}

// Highscores section will allow the user to view previously obtained scores
function viewHighScores() {
    alert("Highscores")
}

// Run game will generate a board based upon the selection of difficulty
function runGame() {
    alert("Game Begun")
}

// Reset game will delete all previously inputtted numbers allowing the user to start again
function resetGame() {
    alert("Game Reset")
}