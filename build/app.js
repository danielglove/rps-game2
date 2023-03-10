"use Strict";

const playerCurrentScore = document.getElementById("player-score");
const computerCurrentScore = document.getElementById("computer-score");
const playerRpsImage = document.querySelector(".player-rps-image");
const computerRpsImage = document.querySelector(".computer-rps-image");
const rockImage = document.querySelector(".rock-image");
const paperImage = document.querySelector(".paper-image");
const scissorsImage = document.querySelector(".scissors-image");
const rockComputerBtn = document.querySelector(".rock-computer-btn");
const paperComputerBtn = document.querySelector(".paper-computer-btn");
const scissorsComputerBtn = document.querySelector(".scissors-computer-btn");
const resultsContainer = document.querySelector(".results-container");
const resetBtn = document.querySelector(".reset-btn");
// Starting conditions for the game.
let playerScore = 0;
let computerScore = 0;
let playerPick;
let computerChoice;
let playing = true;
// let playerName = prompt("Please enter your Display name?");

// Invoking this function will change the background color of Rock btn to green and revert the other buttons to their initial bg-color
const selectRock = function () {
  rockComputerBtn.classList.add("text-white");
  rockComputerBtn.classList.add("scale-100");
  rockComputerBtn.classList.add("transform");
  rockComputerBtn.classList.add("bg-sky-900");
  rockComputerBtn.classList.remove("bg-sky-800");
  paperComputerBtn.classList.remove("bg-sky-900");
  paperComputerBtn.classList.remove("text-white");
  paperComputerBtn.classList.add("bg-sky-800");
  scissorsComputerBtn.classList.remove("bg-sky-900");
  scissorsComputerBtn.classList.add("bg-sky-800");
  scissorsComputerBtn.classList.remove("text-white");
};

// Invoking this function will change the background color of Paper btn to sky 900 revert the other buttons to their initial bg-color
const selectPaper = function () {
  rockComputerBtn.classList.remove("text-white");
  rockComputerBtn.classList.remove("bg-sky-900");
  rockComputerBtn.classList.add("bg-sky-800");
  paperComputerBtn.classList.add("bg-sky-900");
  paperComputerBtn.classList.add("text-white");
  paperComputerBtn.classList.remove("bg-sky-800");
  scissorsComputerBtn.classList.remove("bg-sky-900");
  scissorsComputerBtn.classList.add("bg-sky-800");
  scissorsComputerBtn.classList.remove("text-white");
};

// Invoking this function will change the background color of Scissors btn to sky 900 revert the other buttons to their initial bg-color
const selectScissors = function () {
  scissorsComputerBtn.classList.add("text-white");
  scissorsComputerBtn.classList.add("bg-sky-900");
  scissorsComputerBtn.classList.remove("bg-sky-800");
  scissorsComputerBtn.classList.add("text-white");
  rockComputerBtn.classList.remove("bg-sky-900");
  rockComputerBtn.classList.add("bg-sky-800");
  rockComputerBtn.classList.remove("text-white");
  paperComputerBtn.classList.remove("text-white");
  paperComputerBtn.classList.remove("bg-sky-900");
  paperComputerBtn.classList.add("bg-sky-800");
};
// invoking this function will randomly return any of the 3 outputs:  rock, paper or scissors
const getComputerChoice = function () {
  const randomNumber = Math.trunc(Math.random() * 3 + 1);

  if (randomNumber === 1) {
    computerRpsImage.src = "./images/rock.jpeg";
    selectRock();

    return `Rock`;
  } else if (randomNumber === 2) {
    computerRpsImage.src = "./images/paper.jpeg";
    selectPaper();
    return `Paper`;
  } else {
    computerRpsImage.src = "./images/scissor.jpeg";
    selectScissors();
    return `Scissors`;
  }
};

// mouse over function
const removeImage = function (e) {
  if (e.target.innerText === "Rock") {
    rockImage.classList.add("invisible");
    rockImage.classList.remove("animate-bounce");
  } else if (e.target.innerText === "Paper") {
    paperImage.classList.add("invisible");
    paperImage.classList.remove("animate-bounce");
  } else {
    scissorsImage.classList.add("invisible");
    scissorsImage.classList.remove("animate-bounce");
  }
};

// mouse out function
const addImage = function (e) {
  if (e.target.innerText === "Rock") {
    rockImage.classList.remove("invisible");
    rockImage.classList.add("animate-bounce");
  } else if (e.target.innerText === "Paper") {
    paperImage.classList.remove("invisible");
    paperImage.classList.add("animate-bounce");
  } else {
    scissorsImage.classList.remove("invisible");
    scissorsImage.classList.add("animate-bounce");
  }
};

// Resets the game back to default
const resetGame = function () {
  playing = true;
  playerScore = 0;
  computerScore = 0;
  resultsContainer.textContent = `Start Game`;
  playerCurrentScore.textContent = playerScore;
  computerCurrentScore.textContent = computerScore;
  computerRpsImage.src = "./images/default.jpeg";
  playerRpsImage.src = "./images/default.jpeg";
  rockComputerBtn.classList.remove("bg-sky-900");
  paperComputerBtn.classList.remove("bg-sky-900");
  scissorsComputerBtn.classList.remove("bg-sky-900");
};
resetBtn.addEventListener("click", resetGame);

// Adding event listeners to the various game buttons.
const gameButtons = document.querySelectorAll(".btn");
gameButtons.forEach(function (gameButton) {
  gameButton.addEventListener("mouseover", addImage);

  gameButton.addEventListener("mouseout", removeImage);
});

gameButtons.forEach(function (gameButton) {
  gameButton.addEventListener("click", function (e) {
    if (playing) {
      // Variable gets the input of the user's choice
      playerPick = e.target.innerText;

      if (e.target.innerText === "Rock") {
        playerRpsImage.src = "./images/rock.jpeg";
        rockImage.classList.add("invisible");
      } else if (e.target.innerText === "Paper") {
        playerRpsImage.src = "./images/paper.jpeg";
        paperImage.classList.add("invisible");
      } else {
        playerRpsImage.src = "./images/scissor.jpeg";
        scissorsImage.classList.add("invisible");
      }

      // Variable gets the output of the computer's choice
      computerChoice = getComputerChoice();
      game();

      // Determines the winner based on first player to reach 5 points then  stops the game from playing
      if (playerScore === 5 && playerScore > computerScore) {
        resultsContainer.textContent = `Kudos! You won the game🏆`;
        playing = false;
      } else if (computerScore === 5 && computerScore > playerScore) {
        resultsContainer.textContent = `Whoops! You lost the game`;
        playing = false;
      } else if (
        (playerScore === 5 && playerScore === computerScore) ||
        (computerScore === 5 && computerChoice === playRound)
      ) {
        resultsContainer.textContent = `It is a draw🚩🚩`;
        playing = false;
      }
    }
  });
});

// This function takes a single round of the game and returns a string the declares the winner.
const playRound = function (playerSelection, computerSelection) {
  if (playerSelection === "Rock" && computerSelection === "Paper") {
    resultsContainer.textContent = `You lose! ${computerSelection} beats ${playerSelection}`;
    return `You lose! ${computerSelection} beats ${playerSelection}`;
  } else if (playerSelection === "Paper" && computerSelection === "Rock") {
    resultsContainer.textContent = `You win 🏆 ${playerSelection} beats ${computerSelection}`;
    return `You win 🏆 ${playerSelection} beats ${computerSelection}`;
  } else if (playerSelection === "Scissors" && computerSelection === "Rock") {
    resultsContainer.textContent = `You lose! ${computerSelection} beats ${playerSelection}`;
    return `You lose! ${computerSelection} beats ${playerSelection}`;
  } else if (playerSelection === "Rock" && computerSelection === "Scissors") {
    resultsContainer.textContent = `You win 🏆 ${playerSelection} beats ${computerSelection}`;
    return `You win 🏆 ${playerSelection} beats ${computerSelection}`;
  } else if (playerSelection === "Paper" && computerSelection === "Scissors") {
    resultsContainer.textContent = `You lose! ${computerSelection} beats ${playerSelection}`;
    return `You lose! ${computerSelection} beats ${playerSelection}`;
  } else if (playerSelection === "Scissors" && computerSelection === "Paper") {
    resultsContainer.textContent = `You win 🏆 ${playerSelection} beats ${computerSelection}`;
    return `You win 🏆 ${playerSelection} beats ${computerSelection}`;
  } else {
    resultsContainer.textContent = `It's a draw🚩🚩`;
    return `It's a draw🚩🚩`;
  }
};

// invoking this function adds a score to winner based on each round
const game = function () {
  if (playRound(playerPick, computerChoice).includes("You win 🏆")) {
    playerScore += 1;
  } else if (playRound(playerPick, computerChoice).includes("You lose!")) {
    computerScore += 1;
  } else {
    // Adds 0 to each score incase of a draw
    playerScore += 0;
    computerScore += 0;
  }

  console.log(
    `You chose ${playerPick} and the computer chose ${computerChoice}`
  );
  console.log(playRound(playerPick, computerChoice));
  playerCurrentScore.innerText = `${playerScore}`;
  playerCurrentScore.classList.add("text-lime-800");
  computerCurrentScore.innerText = `${computerScore}`;
  computerCurrentScore.classList.add("text-lime-800");
};