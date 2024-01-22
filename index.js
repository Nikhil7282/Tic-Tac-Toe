const x_class = "x";
const o_class = "o";
const cellElements = document.querySelectorAll("[data-cell]");
const winning_message = document.querySelector(".winning-message");
const winning_message_text = document.querySelector("[data-winning-text]");
const restart = document.querySelector("#restart");

restart.addEventListener("click", () => {
  window.location.reload();
});

let circleTurn;
const winning_combinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 4, 8],
  [2, 4, 6],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
];

function startGame() {
  circleTurn = false;
  cellElements.forEach((cell) => {
    cell.addEventListener("click", handleClick, { once: true });
  });
}

function placeMark(cell, currClass) {
  cell.classList.add(currClass);
  // console.log(cur);
}

function swapTurns() {
  circleTurn = !circleTurn;
}

// function checkWin(currClass) {
//   return winning_combinations.some((combination) => {
//     return combination.every((index) => {
//       return cellElements[index].classList.contains(currClass);
//     });
//   });
// }

function checkWin(currClass) {
  let res = false;
  for (let i = 0; i < winning_combinations.length; i++) {
    let combination = winning_combinations[i];
    let pass = true;
    for (let j = 0; j < combination.length; j++) {
      let index = combination[j];
      if (!cellElements[index].classList.contains(currClass)) {
        pass = false;
        break;
      }
    }
    if (pass) {
      res = true;
      break;
    }
  }
  return res;
}
function isDraw() {
  for (let i = 0; i < cellElements.length; i++) {
    if (
      !cellElements[i].classList.contains(x_class) &&
      !cellElements[i].classList.contains(o_class)
    ) {
      return false;
    }
  }
  return true;
}

function endGame(draw) {
  if (draw) {
    console.log("Draw");
  } else {
    winning_message_text.innerText = `${circleTurn ? "O's" : "X's"} Wins`;
  }
  winning_message.classList.add("show");
}

function handleClick(e) {
  cell = e.target;
  const currentClass = circleTurn ? o_class : x_class;
  placeMark(cell, currentClass);
  if (checkWin(currentClass)) {
    endGame(false);
  } else if (isDraw()) {
    endGame(true);
  } else {
    swapTurns();
  }
}

startGame();
