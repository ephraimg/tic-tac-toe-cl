var prompt = require('prompt');

var row1 = ['-', '-', '-'];
var row2 = ['-', '-', '-'];
var row3 = ['-', '-','-'];
var board = [row1, row2, row3];

var nextPlayer = 1;
var player1;
var player2;

function printBoard() {
  console.log('\nThe board is now: \n  ', row1[0], row1[1], row1[2]);
  console.log('  ', row2[0], row2[1], row2[2]);
  console.log('  ', row3[0], row3[1], row3[2]);
}

console.log('\n\nWelcome to Tic-Tac-Toe!\n\nPlease enter the player names.');
// prompt.start();

prompt.get('Player 1',
  (err, results) => {
    prompt.get('Player 2', 
      (err2, results2) => printNames(results, results2))})

function printNames(results1, results2) {
  player1 = results1['Player 1'];
  player2 = results2['Player 2'];
  console.log(`\nOK. Player 1 ('X's) is ${player1} and Player 2 ('O's) is ${player2}`);
  play(1);
}

function play(player) {
  console.log(`It is Player ${player}'s turn.`);
  printBoard();
  console.log(`\nPlease enter your play, Player ${player}.`);
  prompt.get([`Select row (1, 2, or 3)`, `Select column (1, 2, or 3)`],
    (err, results) => {
      // Check validity of play!

      // Set next player
      nextPlayer = nextPlayer === 1 ? 2 : 1;
      updateBoard(results, player);
    });
}

function updateBoard(results, player) {
  var row = results[`Select row (1, 2, or 3)`];
  var col = results[`Select column (1, 2, or 3)`];
  if (player === 1) {
    board[row - 1][col - 1] = 'X';
  } else {
    board[row - 1][col - 1] = 'O';    
  }
  printBoard();
  checkForWinner();
}

function checkForWinner() {
  var winSymbol;
  if (board[0][1] === board[0][1] && board[0][1] === board[0][2]) { winSymbol = board[0][1]; }
  if (board[1][1] === board[1][1] && board[1][1] === board[1][2]) { winSymbol = board[1][1]; }
  if (board[2][1] === board[2][1] && board[2][1] === board[2][2]) { winSymbol = board[2][1]; }
  if (board[0][0] === board[1][0] && board[1][0] === board[2][0]) { winSymbol = board[0][0]; }
  if (board[0][1] === board[1][1] && board[1][1] === board[2][1]) { winSymbol = board[0][1]; }
  if (board[0][2] === board[1][2] && board[1][2] === board[2][1]) { winSymbol = board[0][2]; }
  if (board[0][0] === board[1][1] && board[1][1] === board[2][2]) { winSymbol = board[1][1]; }
  if (board[0][2] === board[1][1] && board[1][1] === board[2][0]) { winSymbol = board[0][2]; }
  if (winSymbol === 'X') {
    console.log('\nPlayer 1 wins!!!! \nCongratulations, ', player1, '!\n\n');
  } else if (winSymbol === 'O') {
    console.log('\nPlayer 2 wins!!!! \nCongratulations, ', player2, '!\n\n');
  } else {
    // If no winner yet, go to next player
    play(nextPlayer);
  }
}

