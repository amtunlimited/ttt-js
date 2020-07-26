/* This file stores everything to do with the ttt AI. Ideally, the only thing 
 * called externally will be `best_move`, where you feed in a board and player
 * and you get back the position of the...best move (roll credits)
 */

/* minimax: recusively pick the best score for the player, assuming that the
 * opponent is doing the same
 *
 * board: a TTT instance
 * player: either 1 or -1
 */
function minimax(board, player) {
  empties = board.empty();
  
  // Full board means a draw
  if(empties.length == 0)
    return 0

  continues = [];

  for(move of empties) {
    if(board.winAt(move, player))
      return player;
    else
      continues.push(move);
  }

  top_score = -Infinity;
  for(move of continues) {
    score = minimax(board.insert(move), player * -1)
    // Here's the main hack: because one player's scores are the "opposite"
    // for the other player, we can simply multiply the score by the player,
    // and the opponent's scores will swap.
    //
    // Just remember to multiply it back before returning...
    top_score = Math.max(top_score, score * player);
  }

  return top_score * player;
}

/* empty_scores: for a board and player, return a list of {move, score} objects
 * for each empty spot.
 *
 * Doesn't *really* need to be it's own function, but helpful for REPL testing
 */
function empty_scores(board, player) {
  return board.empty().map(move => {
    score = board.winAt(move, player) ? 
      player * 10 : //Prioritize instant wins
      minimax(board.insert(move, player), player * -1);

    return {move: move, score: score}
  });
}

/* best_move: takes empty_scores and picks the best move from the highest score
 *
 * As stated above, these could easily be one function without any real added
 * confusion (and would definitely be more efficient), this just makes things 
 * easier to debug.
 */
function best_move(board, player) {
  return empty_scores(board, player)
          .reduce((a,b) => ((a.score*player) > (b.score*player)) ? a : b)
          .move
}
