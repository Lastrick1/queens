import React, {useState} from "react";
import Board from "./Board";
import Menu from "./Menu";
import Right from "./Right";

function Body() {
  // Initialize empty board
  function initBoard() {
    let startBoard = Array(8).fill().map(()=>Array(8).fill(0));
    return startBoard;
  }
  function deconstruct(cellName) {
    return [parseInt(cellName.substring(1,2)) - 1, cellName.substring(0,1).charCodeAt(0)-97];
  }

  // State variables for number of queens, board
  const [numQ, setNumQ] = useState(8);
  const [board, setBoard] = useState(initBoard());
  const [blocked, setBlocked] = useState(initBoard());
  const [win, setWin] = useState(false);

  // Calculate winning board config
  const allEqual = arr => arr.every( v => v === arr[0]);
  function rowTotals(board) {
    let outArray = [];
    for (let row = 0; row < 8; row++) {
        let sum = board[row].reduce((x,y) => (x+y), 0);
        outArray.push(sum);
    }
    return outArray;
  }
  function colTotals(board) {
    let outArray = [0, 0, 0, 0, 0, 0, 0, 0];
    for (let row = 0; row < 8; row++) {
      for (let col = 0; col < 8; col++) {
        outArray[col] += board[row][col];
      }
    }
    return outArray;
  }
  function lDiagTotals(board) {
    let outArray = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    for (let i = 0; i < 8; i++) {
      for (let j = 0; j < 8; j++) {
        let diff = i - j + 7;
        outArray[diff] += board[i][j];
      }
    }
    return outArray;
  }
  function rDiagTotals(board) {
    let outArray = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    for (let i = 0; i < 8; i++) {
      for (let j = 0; j < 8; j++) {
        let diff = i + j;
        outArray[diff] += board[i][j];
      }
    }
    return outArray;
  }
  function checkWin(board) {
    // Check rows
    setWin(false);
    let rTot = rowTotals(board);
    let cTot = colTotals(board);
    if (rTot.every(val => val === rTot[0]) && cTot.every(val => val === cTot[0])) {
      console.log("Rows and columns are good.");
      let lTot = lDiagTotals(board);
      if (!lTot.some(anyVal => anyVal > 1)) {
        console.log("Left diagonals are good");
        let rtTot = rDiagTotals(board);
        if (!rtTot.some(anyVal => anyVal > 1)) {
          console.log("Right diagonals are good. YOU WIN!");
          setWin(true);
        } else {
          console.log("Failed right diagonals.");
          setWin(false);
        }
      } else {
        console.log("Failed left diagonals.");
        setWin(false);
      }
    } else {
      console.log("Failure in row or column.");
      setWin(false);
    }
  }

  // Find if cell is blocked by any queens
  function getBlocks(board) {
    // Create dictionary of queens
    let allQueens = [];
    for (let row = 0; row < 8; row++) {
      for (let col = 0; col < 8; col++) {
        if (board[row][col] === 1) {
          allQueens.push([row, col]);
        }
      }
    }

    // Cycle through all positions on the Board
    let outArray = initBoard();
    for (let row = 0; row < 8; row++) {
      for (let col = 0; col < 8; col++) {
        // Check row, column, left and right diagonals
        for (let k = 0; k < allQueens.length; k++) {
          if (allQueens[k][0] === row) {outArray[row][col] = 1;} //row
          if (allQueens[k][1] === col) {outArray[row][col] = 1;} //column
          if (allQueens[k][0] - allQueens[k][1] === row - col) {outArray[row][col] = 1;} //left diag
          if (allQueens[k][0] + allQueens[k][1] === row + col) {outArray[row][col] = 1;} //right diag
        }
      }
    }
    return outArray;
  }

  function handleCellClick(id) {
    // Clear win state
    setWin(false);

    // Determine cell row and col information
    let [row, col] = deconstruct(id);
    // Check if not blocked already
    if (blocked[row][col] === 0 || board[row][col] === 1) {
      // Determine is cell already has queen
      let hasQueen = board[row][col] === 1;

      //Toggle queen
      if (hasQueen) {
        board[row][col] = 0;
        setBoard((prevValue) => [...prevValue, board]);
        setNumQ(numQ + 1);
      } else {
        // Check to see if there are any queens left
        if (numQ > 0) {
          board[row][col] = 1;
          setBoard((prevValue) => [...prevValue, board]);
          setNumQ(numQ - 1);

          // Check if winning Board
          if (numQ === 1) {
            checkWin(board);
          }
        }
      }

      // Reset blocked cells Array
      let newBlocked = getBlocks(board);
      setBlocked(newBlocked);
    }


  }

  function handleReset() {
    setNumQ(8);
    setBoard(initBoard());
    setWin(false);
    setBlocked(initBoard());
  }

  return (
    <div className = "row" >
      <div className = "left-column" >
        <Menu resetClick={handleReset} num={numQ} />
      </div>
      <div className = "middle-column" >
         <Board data={board} dBlocks={blocked} cellClick={handleCellClick}/>
      </div>
      <div className = "right-column"> <Right data={win} /> < /div>
    </div>
  );
}

export default Body;
