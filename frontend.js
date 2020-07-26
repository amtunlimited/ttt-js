/* This is all of the "front-end" code for a tic-tac-toe game 
 * 
 * We're gonna make this real dumb: A table with Xs and Os. Click on an empty 
 * one and the computer will make an appropriate move. No restart, no switching
 * sides, just a stupid table. I'm not really "front-end" guy
 */

board = new TTT().insert(new Pos(1,1), -1);

function numToPiece(n) {
  switch(n) {
    case -1:
      return 'O';
    case 0:
      // TODO: turn this into a space after testing
      return '*';
    case 1:
      return 'X';
  }
}

function updateBoard(DOMBoard) {
  // Get the pieces(?) as a list
  pieces = [];
  for(y of [0,1,2])
    for(x of [0,1,2])
      pieces.unshift(board.board[x][y]);
  
  for(row of DOMBoard.children) {
    for(child of row.children) {
      child.replaceChild(
        document.createTextNode(
          numToPiece(pieces.pop())
        ),
        child.firstChild
      )
    }
  }
}

/* clicked: Update board state, run the ai, update the board state again, and
 * redraw the board
 */
function clicked(p) {
  x = p.x;
  y = p.y;
  console.log(p);
  if(board.board[x][y] != 0)
    return;

  board = board.insert(new Pos(x,y), 1);
  console.log(best_move(board, -1))
  board = board.insert(best_move(board, -1), -1);
}

// function clickedCallback(x,y,DOMBoard)

// Initialize the state, interface, and events
function setup() {
  DOMBoard = document.createElement('table');
  DOMBoard.style.fontFamily = 'Sans-Serif';
  for(let y of [0,1,2]) {
    row = DOMBoard.insertRow();
    for(let x of [0,1,2]) {
      cell = row.insertCell();
      cell.appendChild(document.createTextNode(" "));
      cell.onclick = (e) => {
        clicked(new Pos(x,y));
        updateBoard(DOMBoard)
      }
    }
    DOMBoard.appendChild(row);
  }

  updateBoard(DOMBoard);

  document.body.append(DOMBoard);
}

window.onload = function() {setup()};