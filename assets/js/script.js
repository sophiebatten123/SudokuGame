//Wait for the DOM to finish loading before running the game
//Get the button elements and add event listeners to them

// Generates the game board numbers and empty squares
let easyGame = ['','','4','','5','','','','','9','','','7','3','4','6','','','','','3','','2','1','','4','9','','3','5','','9','','4','8','','','9','','','','','','3','','','7','6','','1','8','9','2','','3','1','','9','7','','2','','','','','9','1','8','2','','','3','','','','','6','','1','',''];
let mediumGame = ['6','5','9','','1','','2','8','','1','','','','5','','','3','','2','','','8','','','','1','','','','','1','3','5','','7','','8','','','9','','','','','2','','','3','','7','8','6','4','','3','','2','','','9','','','4','','','','','','1','8','','','','','8','7','6','','','',''];
let hardGame = ['','','','','','','','','2','','','','','','','9','4','','','','3','','','','','','5','','9','2','3','','5','','7','4','8','4','','','','','','','','','6','7','','9','8','','','','','','','7','','6','','','','','','','9','','','','2','','4','','8','5','','','3','6',''];

// Allows the users input the be checked against the answer arrays below
let easyGameSolution = ['2','6','8','9','3','1','7','8','1','5','2','7','5','6','8','1','2','7','6','8','2','5','4','6','7','1','4','3','5','8','5','6','4','6','4','5','7','5','2','7','4','3','9','8'];
let mediumGameSolution = ['3','4','7','8','7','6','2','4','9','3','4','9','7','5','6','4','2','6','9','8','7','1','4','6','3','5','5','9','2','1','1','5','8','7','6','7','6','5','4','2','9','3','9','4','3','1','2','5'];
let hardGameSolution = ['6','8','4','1','5','9','7','3','7','5','1','8','3','2','6','9','2','6','7','4','1','8','1','6','8','5','2','1','7','6','9','3','3','4','2','5','1','2','3','9','4','5','1','8','5','1','6','8','3','4','7','7','2','1','9'];

// Empty answer arrays to hold the users answers allowing for array lengths to be compared upon completion
let easyUserInput = [];
let mediumUserInput = [];
let hardUserInput = [];

// Timer Elements
let timer;
let lastGameTime = "No games played yet";

// Game Board Elements
let squareClicked = "";

// MP3 Elements to create sound on correct and incorrect answers
let correctSound = new Audio('correct.mp3');
let incorrectSound = new Audio('wrong.mp3');

document.addEventListener("DOMContentLoaded", function() {
    let instructionsManual = document.getElementById("instructions");
    let playButton = document.getElementById("play");
    let resetButton = document.getElementById("reset");
    let easy = document.getElementById("easy-game");
    let medium = document.getElementById("medium-game");
    let hard = document.getElementById("hard-game");
    let userDifficulty = document.getElementById("user-difficulty");
    let difficulty = document.getElementById("difficulty");

    easy.addEventListener("click", function (){
        userDifficulty.innerHTML = "Easy";
        difficulty.style.zIndex = -1;
    });

    medium.addEventListener("click", function (){
        userDifficulty.innerHTML = "Medium";
        difficulty.style.zIndex = -1;
    });

    hard.addEventListener("click", function (){
        userDifficulty.innerHTML = "Hard";
        difficulty.style.zIndex = -1;
    });

    instructionsManual.addEventListener("click", function() {
        displayInstructions();
    });
    
    playButton.addEventListener("click", function() {
        selectDifficulty();
    });

    resetButton.addEventListener("click", function() {
        resetGame();
    });
});

// Instructions section will display instructions to the user upon click as a pop up element
function displayInstructions() {
    let instructionsPopUp = document.getElementById("instructionspopup");
    let close = document.getElementById("close-instructions");

    instructionsPopUp.style.zIndex = 1;
    instructionsPopUp.style.pointerEvents = "auto";

    close.addEventListener("click", function(){
        instructionsPopUp.style.zIndex = -1;
    });
}

//Board will generate based upon the users difficulty selection and the game will begin
function selectDifficulty() {
    let time = document.getElementById("timer").innerHTML;

    if (time === "0:00") {
       let counter=-1;
       let userDifficulty = document.getElementById("user-difficulty");

        if (userDifficulty.innerHTML === "Easy") {
            runEasyGame(counter);
        } else if (userDifficulty.innerHTML === "Medium") {
            runMediumGame(counter);
        } else if (userDifficulty.innerHTML === "Hard") {
            runHardGame(counter);
        }
    } else {
        console.log("You are already playing the game!");
    }
}

//Runs the EASYGAME based upon the users selection. The board generates and user input is enabled.

function runEasyGame(counter) {
    let number = document.getElementsByClassName('active');

    timer = setInterval(function(){
        startTimer();
    }, 1000);

    for (let i=0; i < easyGame.length; i++) {
        for (i=0; i < number.length; i++) {
            if (easyGame[i] === '' && number[i].innerHTML === '') {
                number[i].classList.add("userInput");
                number[i].dataset.index = ++counter;
                number[i].style.backgroundColor = '#D2EEEF';
                number[i].addEventListener('click', function(event) {
                    squareClicked = event.target;

                    for (i=0; i < number.length; i++) {
                        if (number[i].style.backgroundColor == 'rgb(146, 200, 197)' && number[i].innerHTML === '') {
                            number[i].style.backgroundColor = '#D2EEEF';
                        }
                    }

                    if (squareClicked.innerHTML === '') {
                        squareClicked.style.backgroundColor = '#92C8C5';
                    } else {
                        return;
                    }
                });
            } else {
                number[i].innerHTML = easyGame[i];
                number[i].style.backgroundColor = "white";
            }   
        }
    }
        
   let numberPad = document.getElementsByClassName("number-pad-item");

   for (let i=0; i < numberPad.length; i++) {
        numberPad[i].addEventListener('click', function(e) {
            if (squareClicked.innerHTML === '') {
                squareClicked.innerHTML = e.target.innerHTML;
                checkAnswersEasy(e.target.innerHTML, squareClicked.dataset.index, squareClicked);
            } else {
                return;
            }
        });
    }
}

//Checks the EASYGAME answers against the solution global array

function checkAnswersEasy(value, index, active) {
    
    if (value == easyGameSolution[index]) {
        correctAnswer(value, active);
    } else {
        incorrectAnswer(active);
    }

    if (easyUserInput.length === easyGameSolution.length) {
        wellDone();
    } else {
        return;
    }
}

//Runs the MEDIUMGAME based upon the users selection. The board generates and user input is enabled.

function runMediumGame(counter) {
    let number = document.getElementsByClassName('active');

    timer = setInterval(function(){
        startTimer();
    }, 1000);

    for (let i=0; i < mediumGame.length; i++) {
        for (i=0; i < number.length; i++) {
            if (mediumGame[i] === '' && number[i].innerHTML === '') {
                number[i].classList.add("userInput");
                number[i].dataset.index = ++counter;
                number[i].style.backgroundColor = '#D2EEEF';

                number[i].addEventListener('click', function(event) {
                    squareClicked = event.target;

                    for (i=0; i < number.length; i++) {
                        if (number[i].style.backgroundColor == 'rgb(146, 200, 197)' && number[i].innerHTML === '') {
                            number[i].style.backgroundColor = '#D2EEEF';
                        }
                    }
                       
                    if (squareClicked.innerHTML === '') {
                        squareClicked.style.backgroundColor = '#92C8C5';
                    } else {
                        return;
                    }
                });
            } else {
                number[i].innerHTML = mediumGame[i];
                number[i].style.backgroundColor = "white";
            }   
        }
    }
        
   let numberPad = document.getElementsByClassName("number-pad-item");

   for (let i=0; i < numberPad.length; i++) {
        numberPad[i].addEventListener('click', function(e) {
            if (squareClicked.innerHTML === '') {
                squareClicked.innerHTML = e.target.innerHTML;
                checkAnswersMedium(e.target.innerHTML, squareClicked.dataset.index, squareClicked);
            } else {
                return;
            }
        });
    }
}

//Checks the MEDIUMGAME answers against the solution global array

function checkAnswersMedium(value, index, active) {
    
    if (value == mediumGameSolution[index]) {
        correctAnswer(value, active);
     } else {
        incorrectAnswer(active);
     }

     if (mediumUserInput.length === mediumGameSolution.length) {
        wellDone();
     } else {
        return;
     }
}

//Runs the HARDGAME based upon the users selection. The board generates and user input is enabled.

function runHardGame(counter) {
    let number = document.getElementsByClassName('active');

    timer = setInterval(function(){
        startTimer();
    }, 1000);

    for (let i=0; i < hardGame.length; i++) {
        for (i=0; i < number.length; i++) {
            if (hardGame[i] === '' && number[i].innerHTML === '') {
                number[i].classList.add("userInput");
                number[i].dataset.index = ++counter;
                number[i].style.backgroundColor = '#D2EEEF';

                number[i].addEventListener('click', function(event) {
                    squareClicked = event.target;

                    for (i=0; i < number.length; i++) {
                        if (number[i].style.backgroundColor == 'rgb(146, 200, 197)' && number[i].innerHTML === '') {
                            number[i].style.backgroundColor = '#D2EEEF';
                        }
                    }

                    if (squareClicked.innerHTML === '') {
                        squareClicked.style.backgroundColor = '#92C8C5';
                    } else {
                        return;
                    }
                });
            } else {
                number[i].innerHTML = hardGame[i];
                number[i].style.backgroundColor = "white";
            }   
        }
    }
        
   let numberPad = document.getElementsByClassName("number-pad-item");

   for (let i=0; i < numberPad.length; i++) {
        numberPad[i].addEventListener('click', function(e) {
            if (squareClicked.innerHTML === '') {
                squareClicked.innerHTML = e.target.innerHTML;
                checkAnswersHard(e.target.innerHTML, squareClicked.dataset.index, squareClicked);
            } else {
                return;
            }
        });
    }
}
  
//Checks the HARDGAME answers against the solution global array

function checkAnswersHard(value, index, active) {

    if (value == hardGameSolution[index]) {
        correctAnswer(value, active);
     } else {
        incorrectAnswer(active);
     }

     if (hardUserInput.length === hardGameSolution.length) {
        wellDone();
     } else {
        return;
     }
}

// Correct answer function

function correctAnswer(value, active) {
    active.style.backgroundColor = "#ACD8AA";
        easyUserInput.push(value);
        correctSound.play();
}

// Incorrect answer function

function incorrectAnswer(active) {
    setTimeout(function () {
    active.style.backgroundColor = "#D2EEEF";
    }, 250);
    active.style.backgroundColor = "#E27A78";
    active.innerText = "";
    incorrectSound.play();
}

// Reset game will delete all previously inputtted numbers by reloading the window
function resetGame() {
    window.location.reload();
}

// Start timer will begin when the difficulty has been selected and the play button has been pressed
function startTimer() {
    var time = document.getElementById("timer").innerHTML;
    var arr = time.split(":");
    var minutes = arr[0];
    var seconds = arr[1];

    if (seconds == 59) {
        minutes++;
        seconds = 0;
        if (minutes < 10) minutes = "0" + minutes;
    } else {
        seconds++;
        if (seconds < 10) seconds = "0" + seconds;
    }

    document.getElementById("timer").innerHTML = minutes + ":" + seconds;
}

// Well done message will appear when the user have completed all empty squares correctly

function wellDone() {
    let replayGame = document.getElementById("replay");
    var time = document.getElementById("timer").innerHTML;
    var arr = time.split(":");
    var minutes = arr[0];
    var seconds = arr[1];

    lastGameTime = `${minutes}:${seconds}`;

    let congratulationsPopUp = document.getElementById("winnerpopup");
    let close = document.getElementById("close-winner");

    document.getElementById("well-done-text").innerHTML = "Well done you have won!<br> You completed the sudoku in " + lastGameTime;

    congratulationsPopUp.style.zIndex = 1;
    congratulationsPopUp.style.pointerEvents = "auto";

    close.addEventListener("click", function(){
        congratulationsPopUp.style.zIndex = -1;
    });

    replayGame.addEventListener("click", function () {
        resetGame();
    });
}