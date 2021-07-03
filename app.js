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

Array.from(squares).forEach((square, index) => {
  square.addEventListener("click", () => {
    console.log("squares :", square, "index: ", index);
    console.log("playerOneTurn: ", playerOneTurn);
    console.log("playerTwoTurn: ", playerTwoTurn);
    let playerOnePointGiven = false;
    let playerTwoPointGiven = false;
    let pointGiven = false;

    // Make sure you cannot click already taken square
    if (
      squareMatrix[index].user == "playerOne" ||
      squareMatrix[index].user == "playerTwo"
    ) {
      console.log("Square is TAKEN!");
      console.log("squareMatrix[index].user", squareMatrix[index].user);
      square.style = "pointer-events: none";
      // Set color back to what it was
      if (squareMatrix[index].user == "playerOne") {
        square.style = "background-color: pink";
      } else if (squareMatrix[index].user == "playerTwo") {
        square.style = "background-color: azure";
      }
      return;
    }

    // turns
    if (playerOneTurn == true) {
      // make sure you cant change colors
      if (square.getAttribute("style") == "background-color: azure;") {
        return;
      }

      square.style = "background-color: pink";
      squareMatrix[index].taken = true;
      squareMatrix[index].user = "playerOne";
    } else if (playerTwoTurn == true) {
      // make sure you cant change colors
      if (square.getAttribute("style") == "background-color: pink;") {
        return;
      }
      square.style = "background-color: azure";
      squareMatrix[index].taken = true;
      squareMatrix[index].user = "playerTwo";
    }

    console.log("squareMatrix[index].user", squareMatrix[index].user);

    playerOneTurn = !playerOneTurn;
    playerTwoTurn = !playerTwoTurn;

    console.log("matrix: ", squareMatrix);

    let pinkArray = [];
    let azureArray = [];

    // winner combos
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

    console.log("pink array: ", pinkArray);
    console.log("azure array: ", azureArray);

    // Check for winner
    // PlayerOne - Pink
    if (
      (firstRow.every((current) => pinkArray.includes(current)) ||
        secondRow.every((current) => pinkArray.includes(current)) ||
        thirdRow.every((current) => pinkArray.includes(current)) ||
        firstColumn.every((current) => pinkArray.includes(current)) ||
        secondColumn.every((current) => pinkArray.includes(current)) ||
        thirdColumn.every((current) => pinkArray.includes(current)) ||
        diagonalFromLeft.every((current) => pinkArray.includes(current)) ||
        diagonalFromRight.every((current) => pinkArray.includes(current))) &&
      !playerOnePointGiven &&
      !pointGiven &&
      !gameComplete
    ) {
      console.log("PINK is tha winna");

      // make sure only one point is given per round
      console.log("pink lenght and no point given: ", pinkArray.length);
      playerOneCounter++;
      playerOnePointGiven = true;
      gameComplete = true;
      console.log("pink point given: ", pointGiven);
      pointGiven = true;
    }

    // PlayerTwo - Azure
    if (
      (firstRow.every((current) => azureArray.includes(current)) ||
        secondRow.every((current) => azureArray.includes(current)) ||
        thirdRow.every((current) => azureArray.includes(current)) ||
        firstColumn.every((current) => azureArray.includes(current)) ||
        secondColumn.every((current) => azureArray.includes(current)) ||
        thirdColumn.every((current) => azureArray.includes(current)) ||
        diagonalFromLeft.every((current) => azureArray.includes(current)) ||
        diagonalFromRight.every((current) => azureArray.includes(current))) &&
      !playerOnePointGiven &&
      !pointGiven &&
      !gameComplete
    ) {
      console.log("Azure is tha winna");
      // make sure only one point is given per round

      console.log("azure lenght and no point given: ", azureArray.length);

      playerTwoCounter++;
      playerTwoPointGiven = true;
      gameComplete = true;
      console.log("azure point given: ", pointGiven);
      pointGiven = true;
    }

    // Game over - no more
    if (gameComplete) {
      gameCompleteMessage.innerHTML = "Game Over";
      playerOneCounterText.innerHTML = playerOneCounter;
      playerTwoCounterText.innerHTML = playerTwoCounter;

      console.log("We have a winner - change style");
      gameComplete = false;
      pointGiven = false;

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
    }
  });
});
