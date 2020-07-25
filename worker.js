/** minimax: recusively pick the best score for the player, assuming that the
 * opponent is doing the same
 *
 * board: a TTT instance
 * player: either 1 or -1
 */
minimax(board, player) {
  empties = board.empty();
  
  // Full board means a draw
  if(empties.length == 0)
    return 0

  continues = [];

  for(move of empties) {
    if(board.winAt(move, player)
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

/* empty_scores: for a board and player, return a list of {board, score}
 * objects for each empty spot.
 *
 * Doesn't *really* need to be it's own function, but helpful for REPL testing
 */
