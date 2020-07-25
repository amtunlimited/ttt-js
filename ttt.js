/* ttt.js: common definitions for tic-tac-toe (or ttt)
 *
 * This file defines how ttt boards and state will be handled via a TTT object
 *
 * TTT wil be an immutible object (meaning any function that "changes the state"
 * will actuall just return a completely new object) as to not deal with
 * tracking changes are made up and down the decision tree.
 * 
 * The "state" will consist of a 2D array `board` where 0 is empty and 1 and 2
 * are the players.
 *
 * common nomenclature
 * 
 * x,y = coordinates
 * p = the player
 * c = coordinate object
 */

function Pos(x,y) {
  this.x = x;
  this.y = y;
}

function TTT() {
  this.board = [
    [0,0,0],
    [0,0,0],
    [0,0,0],
  ];

  /* "Shallow" copies won't copy arrays of arrays, so we need to clone each
   * array individually
   */
  this.bCopy = () => [
    this.board[0].slice(),
    this.board[1].slice(),
    this.board[2].slice(),
  ];

/* We'll check if inserting at a particular cell means a win, because it means
 * less typing for me
 *
 * note: Let's get this out of the way now: I know that one letter variable 
 * names are a sin against Knuth, but there's a lot of repetitive boiler plate
 * to describe very simple things and it will drive me crazy. I'll write 
 * comments, I promise.
 */
  this.winAt = (c, p) => {
    b = this.bCopy();
    x = c.x;
    y = c.y
    // Do we reeeeeeeally need to  this is a valid move?
    // ...nah
    b[x][y] = p;

    return b[x][0] == b[x][1] == b[x][2] == p || // row
           b[0][y] == b[1][y] == b[2][y] == p || // column
           b[0][0] == b[1][1] == b[2][2] == p || // diagonal 1 (x==y)
           b[0][2] == b[1][1] == b[0][2] == p;   // diagonal 2 (x+y==2)
  };

  this.insert = (c, p) => {
    b = this.bCopy();
    b[c.x][c.y] = p;

    new_board = new TTT();
    new_board.board = b;
    return new_board;
  };

  this.empty = () => {
    empties = [];

    for(x of [0,1,2])
      for(y of [0,1,2])
	if(this.board[x][y]==0)
	  empties.push(new Pos(x,y));

    return empties;
  }

}
