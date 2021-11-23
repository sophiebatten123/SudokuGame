//Wait for the DOM to finish loading before running the game
//Get the button elements and add event listeners to them

// Game board number arrays
let easyGame = ['','','4','','5','','','','','9','','','7','3','4','6','','','','','3','','2','1','','4','9','','3','5','','9','','4','8','','','9','','','','','','3','','','7','6','','1','8','9','2','','3','1','','9','7','','2','','','','','9','1','8','2','','','3','','','','','6','','1','',''];
let mediumGame = ['6','5','9','','1','','2','8','','1','','','','5','','','3','','2','','','8','','','','1','','','','','1','3','5','','7','','8','','','9','','','','','2','','','3','','7','8','6','4','','3','','2','','','9','','','4','','','','','','1','8','','','','','8','7','6','','','',''];
let hardGame = ['','','','','','','','','2','','','','','','','9','4','','','','3','','','','','','5','','9','2','3','','5','','7','4','8','4','','','','','','','','','6','7','','9','8','','','','','','','7','','6','','','','','','','9','','','','2','','4','','8','5','','','3','6',''];

// Game board number solutions
let easyGameSolution = ['2','6','8','9','3','1','7','8','1','5','2','7','5','6','8','1','2','7','6','8','2','5','4','6','7','1','4','3','5','8','5','6','4','6','4','5','7','5','2','7','4','3','9','8'];
let mediumGameSolution = ['3','4','7','8','7','6','2','4','9','3','4','9','7','5','6','4','2','6','9','8','7','1','4','6','3','5','5','9','2','1','1','5','8','7','6','7','6','5','4','2','9','3','9','4','3','1','2','5'];
let hardGameSolution = ['6','8','4','1','5','9','7','3','7','5','1','8','3','2','6','9','2','6','7','4','1','8','1','6','8','5','2','1','7','6','9','3','3','4','2','5','1','2','3','9','4','5','1','8','5','1','6','8','3','4','7','7','2','1','9'];

// Final Solution
let easyFinalSolution = ['2','6','4','8','5','9','3','1','7','9','8','1','7','3','4','6','5','2','7','5','3','6','2','1','8','4','9','1','3','5','2','7','4','8','6','8','9','2','5','4','6','7','3','1','4','7','6','3','1','8','9','2','5','3','1','8','9','7','5','2','6','4','6','4','9','1','8','2','5','7','3','5','2','7','4','6','3','1','9','8']

// Empty Answers Array

let easyUserInput = [];
let mediumUserInput = [];
let hardUserInput = [];

// Timer Elements
let timer;
let lastGameTime = "No games played yet";
var time;
var arr;
var minutes;
var seconds;

//User login details
var userDetails = [
    {
        username: "sophie",
        password: "tom"
    },
    {
        username: "tom",
        password: "sophie"
    },
]

document.addEventListener("DOMContentLoaded", function() {
    let userLogin = document.getElementById("login");
    let instructionsManual = document.getElementById("instructions");
    let highScores = document.getElementById("personal-best");
    let playButton = document.getElementById("play");
    let resetButton = document.getElementById("reset");
    let loginButton = document.getElementById("login-button");

    userLogin.addEventListener("click", function() {
        loginUser();
    })

    loginButton.addEventListener("click", function() {
        accessLoginInformation();
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
    let userLoginPopUp = document.getElementById("loginpopup");
    let close = document.getElementById("close-login");
    let register = document.getElementById("new-account")

    userLoginPopUp.style.zIndex = 1;
    userLoginPopUp.style.pointerEvents = "auto";

    close.addEventListener("click", function() {
        userLoginPopUp.style.zIndex = -1;
    })

    register.addEventListener("click", function() {
        userLoginPopUp.style.zIndex = -1;
        registerDetails();
    })
}

function accessLoginInformation() {
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;

    for (i=0; i < userDetails.length; i++) {
        if (username == userDetails[i].username && password == userDetails[i].password) {
            console.log(username + "is logged in");
            displayUserDetails(username);
            return
        }
    }
    console.log("incorrect username or password");
    alert("yay")
}

function displayUserDetails(username) {
    usernameEditable = document.getElementById("username-editable");
    usernameEditable.innerText = username;
}

function registerDetails() {
    let registrationPopUp = document.getElementById("registerpopup")
    let close = document.getElementById("close-registration");

    registrationPopUp.style.zIndex = 1;
    registrationPopUp.style.pointerEvents = "auto";

    close.addEventListener("click", function() {
        registrationPopUp.style.zIndex = -1;
    })

}

// Instructions section will display instructions to the user upon click
function displayInstructions() {
    let instructionsPopUp = document.getElementById("instructionspopup");
    let close = document.getElementById("close-instructions");

    instructionsPopUp.style.zIndex = 1;
    instructionsPopUp.style.pointerEvents = "auto";

    close.addEventListener("click", function(){
        instructionsPopUp.style.zIndex = -1;
    })
}

// Highscores section will allow the user to view previously obtained scores
function viewHighScores() {
    let highscoresPopUp = document.getElementById("highscorespopup");
    let close = document.getElementById("close-highscores");

    highscoresPopUp.style.zIndex = 1;
    highscoresPopUp.style.pointerEvents = "auto";

    close.addEventListener("click", function(){
        highscoresPopUp.style.zIndex = -1;
    })
}

// Run game will generate a board based upon the selection of difficulty
function runGame() {

    let counter=-1;

    var easy = document.getElementById("easy");
    var medium = document.getElementById("medium");
    var hard = document.getElementById("hard");

    if (easy.checked==true) {
        runEasyGame(medium, hard, counter);
    } else if (medium.checked==true) {
        runMediumGame(easy, hard, counter);
    } else if (hard.checked==true) {
        runHardGame(easy, medium, counter);
    }
}

//Runs the EASYGAME and Checks Answers

function runEasyGame(medium, hard, counter) {
    timer = setInterval(function(){
        startTimer();
    }, 1000);

    medium.disabled = true;   
    hard.disabled = true;  
    
    for (i=0; i < easyGame.length; i++) {
        let number = document.getElementsByClassName('number');
           for (i=0; i < number.length; i++) {
             if (easyGame[i] === '') {
                number[i].setAttribute("contenteditable", true);
                number[i].classList.add("userInput");
                number[i].dataset.index = ++counter;
                number[i].addEventListener('keyup', event => {
                   if (isNaN(event.target.innerText)) {
                      alert('You must only input numbers');
                      event.target.innerText = "";
                   } else {
                   checkAnswersEasy(event.target.innerText, event.target.dataset.index, event.target, number)
                   }
                })
                number[i].style.backgroundColor = '#bbb';
             }
             else {
                number[i].innerHTML = easyGame[i];
            }   
        }
    }
}

function checkAnswersEasy(value, index, active, number) {
    let correct = document.getElementById('correct');
    let incorrect = document.getElementById('incorrect')
    
       if (value === easyGameSolution[index]) {
          active.contentEditable = false;
          active.style.backgroundColor = "green";
          correct.style.opacity = "1";
          correct.style.pointerEvents = "auto";
          setTimeout(function () {
             correct.style.opacity="0";
          }, 1000);
          easyUserInput.push(value);
          console.log(easyUserInput);
       } else {
          active.style.backgroundColor = "red";
          setTimeout(function () {
             active.style.backgroundColor = "#bbb";
          }, 1000)
          active.innerText = "";
          incorrect.style.opacity = "1";
          incorrect.style.pointerEvents = "auto";
          setTimeout(function () {
             incorrect.style.opacity="0";
          }, 1000);
       }

        if (easyUserInput.length === easyGameSolution.length) {
            wellDone();
        } else {
           console.log("continue play");
        }
}

//Runs the MEDIUMGAME and Checks Answers

function runMediumGame(easy, hard, counter) {
    setInterval(function(){
        startTimer();
    }, 1000);

    easy.disabled = true;   
    hard.disabled = true;
    
    for (i=0; i < mediumGame.length; i++) {
        let number = document.getElementsByClassName('number');
           for (i=0; i < number.length; i++) {
             if (mediumGame[i] === '') {
                number[i].setAttribute("contenteditable", true);
                number[i].classList.add("userInput");
                number[i].dataset.index = ++counter;
                number[i].addEventListener('keyup', event => {
                   if (isNaN(event.target.innerText)) {
                      alert('You must only input numbers');
                      event.target.innerText = "";
                   } else {
                   checkAnswersMedium(event.target.innerText, event.target.dataset.index, event.target)
                   }
                })
                number[i].style.backgroundColor = '#bbb';
             }
             else {
                number[i].innerHTML = mediumGame[i];
            }   
        }
    }
}

function checkAnswersMedium(value, index, active) {
    let correct = document.getElementById('correct');
    let incorrect = document.getElementById('incorrect')
    
       if (value === mediumGameSolution[index]) {
          active.contentEditable = false;
          active.style.backgroundColor = "green";
          correct.style.opacity = "1";
          correct.style.pointerEvents = "auto";
          setTimeout(function () {
             correct.style.opacity="0";
          }, 1000);
       } else {
          active.style.backgroundColor = "red";
          setTimeout(function () {
             active.style.backgroundColor = "#bbb";
          }, 1000)
          active.innerText = "";
          incorrect.style.opacity = "1";
          incorrect.style.pointerEvents = "auto";
          setTimeout(function () {
             incorrect.style.opacity="0";
          }, 1000);
       }
    }

//Runs the HARDGAME and Checks Answers

function runHardGame(easy, medium, counter) {
    setInterval(function(){
        startTimer();
    }, 1000);

    easy.disabled = true;   
    medium.disabled = true;
    
    for (i=0; i < hardGame.length; i++) {
        let number = document.getElementsByClassName('number');
           for (i=0; i < number.length; i++) {
             if (hardGame[i] === '') {
                number[i].setAttribute("contenteditable", true);
                number[i].classList.add("userInput");
                number[i].dataset.index = ++counter;
                number[i].addEventListener('keyup', event => {
                   if (isNaN(event.target.innerText)) {
                      alert('You must only input numbers');
                      event.target.innerText = "";
                   } else {
                   checkAnswersHard(event.target.innerText, event.target.dataset.index, event.target)
                   }
                })
                number[i].style.backgroundColor = '#bbb';
             }
             else {
                number[i].innerHTML = hardGame[i];
            }   
        }
    }
}

function checkAnswersHard(value, index, active) {
    let correct = document.getElementById('correct');
    let incorrect = document.getElementById('incorrect')
    
       if (value === hardGameSolution[index]) {
          active.contentEditable = false;
          active.style.backgroundColor = "green";
          correct.style.opacity = "1";
          correct.style.pointerEvents = "auto";
          setTimeout(function () {
             correct.style.opacity="0";
          }, 1000);
       } else {
          active.style.backgroundColor = "red";
          setTimeout(function () {
             active.style.backgroundColor = "#bbb";
          }, 1000)
          active.innerText = "";
          incorrect.style.opacity = "1";
          incorrect.style.pointerEvents = "auto";
          setTimeout(function () {
             incorrect.style.opacity="0";
          }, 1000);
       }
    }

// Reset game will delete all previously inputtted numbers allowing the user to start again
function resetGame() {
    let number = document.getElementsByClassName('number');

    document.getElementById("easy").checked = false;
    document.getElementById("medium").checked = false;
    document.getElementById("hard").checked = false;

    document.getElementById("easy").disabled = false;
    document.getElementById("medium").disabled = false;
    document.getElementById("hard").disabled = false;

    for (i=0; i < number.length; i++) {
       number[i].innerText = "";
       number[i].style.backgroundColor = "white";
    }
    
    resetTimer();
}

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

function resetTimer() {
    clearInterval(timer);

    var minutes = "0";
    var seconds = "00";

    document.getElementById("timer").innerHTML = minutes + ":" + seconds;
}

function wellDone() {
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
    })

    console.log("Well done you have won! You completed the sudoku in " + lastGameTime);

    resetGame();
}