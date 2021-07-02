const squares = document.getElementsByClassName("square");
const gameCompleteMessage = document.getElementById("gameStatus");
const restart = document.getElementById("restart");
const playerOneCounterText = document.getElementById("playerOneCounter");
const playerTwoCounterText = document.getElementById("playerTwoCounter");

console.log("squares:", squares);

let playerOneTurn = true;
let playerTwoTurn = false;

let squareMatrix = [
  { index: 0, user: null },
  { index: 1, user: null },
  { index: 2, user: null },
  { index: 3, user: null },
  { index: 4, user: null },
  { index: 5, user: null },
  { index: 6, user: null },
  { index: 7, user: null },
  { index: 8, user: null },
];

let gameComplete = false;
let playerOneCounter = 0;
let playerTwoCounter = 0;

let vsComputer = false;

restart.addEventListener("click", () => {
  console.log("restart clicked");
  Array.from(squares).forEach((square, index) => {
    square.style = "background-color: cadetblue";
    console.log("test restart");
  });
  gameCompleteMessage.innerHTML = "";
  squareMatrix = [
    { index: 0, user: null },
    { index: 1, user: null },
    { index: 2, user: null },
    { index: 3, user: null },
    { index: 4, user: null },
    { index: 5, user: null },
    { index: 6, user: null },
    { index: 7, user: null },
    { index: 8, user: null },
  ];
});

// X and O icons

// Add random computer mode
// isComputerMode = false
// Computer does first move - random
// huge if -> if(computerMode) => playerTwo = Math.random()*8.floor

Array.from(squares).forEach((square, index) => {
  square.addEventListener("click", () => {
    console.log("squares :", square, "index: ", index);

    if (playerOneTurn == true) {
      if (square.getAttribute("style") == "background-color: azure;") {
        return;
      }
      square.style = "background-color: pink";
      squareMatrix[index].taken = true;
      squareMatrix[index].user = "playerOne";
    } else if (playerTwoTurn == true) {
      if (square.getAttribute("style") == "background-color: pink;") {
        return;
      }
      square.style = "background-color: azure";
      squareMatrix[index].taken = true;
      squareMatrix[index].user = "playerTwo";
    }

    playerOneTurn = !playerOneTurn;
    playerTwoTurn = !playerTwoTurn;

    console.log("matrix: ", squareMatrix);

    let pinkArray = [];
    let azureArray = [];
    const firstRow = [0, 1, 2];
    const secondRow = [3, 4, 5];
    const thirdRow = [6, 7, 8];

    const firstColumn = [0, 3, 6];
    const secondColumn = [1, 4, 7];
    const thirdColumn = [2, 5, 8];

    const diagonalFromLeft = [0, 4, 8];
    const diagonalFromRight = [2, 4, 6];

    squareMatrix.forEach((square) => {
      if (square.user == "playerOne") {
        pinkArray.push(square.index);
      }
      if (square.user == "playerTwo") {
        azureArray.push(square.index);
      }
    });

    console.log("test array: ", pinkArray);

    // PlayerOne - Pink
    if (firstRow.every((current) => pinkArray.includes(current))) {
      console.log("PINK is tha winna - firstRow");
      gameComplete = true;
      playerOneCounter++;
    } else if (secondRow.every((current) => pinkArray.includes(current))) {
      console.log("PINK is tha winna - secondRow");
      gameComplete = true;
      playerOneCounter++;
    } else if (thirdRow.every((current) => pinkArray.includes(current))) {
      console.log("PINK is tha winna - thirdRow");
      gameComplete = true;
      playerOneCounter++;
    } else if (firstColumn.every((current) => pinkArray.includes(current))) {
      console.log("PINK is tha winna - firstColumn");
      gameComplete = true;
      playerOneCounter++;
    } else if (secondColumn.every((current) => pinkArray.includes(current))) {
      console.log("PINK is tha winna - secondColumn");
      gameComplete = true;
      playerOneCounter++;
    } else if (thirdColumn.every((current) => pinkArray.includes(current))) {
      console.log("PINK is tha winna - thirdColumn");
      gameComplete = true;
      playerOneCounter++;
    } else if (
      diagonalFromLeft.every((current) => pinkArray.includes(current))
    ) {
      console.log("PINK is tha winna - diagonalFromLeft");
      gameComplete = true;
      playerOneCounter++;
    } else if (
      diagonalFromRight.every((current) => pinkArray.includes(current))
    ) {
      console.log("PINK is tha winna - diagonalFromRight");
      gameComplete = true;
      playerOneCounter++;
    }

    // PlayerTwo - Azure
    if (firstRow.every((current) => azureArray.includes(current))) {
      console.log("Azure is tha winna - firstRow");
      gameComplete = true;
      playerTwoCounter++;
    } else if (secondRow.every((current) => azureArray.includes(current))) {
      console.log("Azure is tha winna - secondRow");
      gameComplete = true;
      playerTwoCounter++;
    } else if (thirdRow.every((current) => azureArray.includes(current))) {
      console.log("Azure is tha winna - thirdRow");
      gameComplete = true;
      playerTwoCounter++;
    } else if (firstColumn.every((current) => azureArray.includes(current))) {
      console.log("Azure is tha winna - firstColumn");
      gameComplete = true;
      playerTwoCounter++;
    } else if (secondColumn.every((current) => azureArray.includes(current))) {
      console.log("Azure is tha winna - secondColumn");
      gameComplete = true;
      playerTwoCounter++;
    } else if (thirdColumn.every((current) => azureArray.includes(current))) {
      console.log("Azure is tha winna - thirdColumn");
      gameComplete = true;
      playerTwoCounter++;
    } else if (
      diagonalFromLeft.every((current) => azureArray.includes(current))
    ) {
      console.log("Azure is tha winna - diagonalFromLeft");
      gameComplete = true;
      playerTwoCounter++;
    } else if (
      diagonalFromRight.every((current) => azureArray.includes(current))
    ) {
      console.log("Azure is tha winna - diagonalFromRight");
      gameComplete = true;
      playerTwoCounter++;
    }

    // Game over - no more
    if (gameComplete) {
      gameCompleteMessage.innerHTML = "Game Over";
      playerOneCounterText.innerHTML = playerOneCounter;
      playerTwoCounterText.innerHTML = playerTwoCounter;
      // square.style = "pointer-events: none";
      // Array.from(squares).forEach((el) => (el.style = "pointer-events: none"));
      console.log("We have a winner - change style");
      gameComplete = false;
    }
  });
});
