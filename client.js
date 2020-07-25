test = new TTT();
test.board = [
  [1,-1,1],
  [0,-1,0],
  [0,0,0]
];

console.log(empty_scores(test, 1));
console.log(best_move(test, 1));
