
import { findEmptySpaces, lines, paths, PLAYER_EMPTY } from '../game';

function pickRandom(array) {
  return array[Math.floor(Math.random() * array.length)];
}

function getPositionScore(board, turn, player, opponent) {

  // 1. Find a winning move
  
  for (let line of lines) {
    
    const v1 = board[line[0]];
    const v2 = board[line[1]];
    const v3 = board[line[2]];

    if (v1 === v2 && v2 === v3) {
      if (v1 === player) {
        return 1;
      }
      else if (v1 === opponent) {
        return -1;
      }
    }
  }

  const available = findEmptySpaces(board);

  if (available.length === 0) {
    return 0;
  }

  const playerTurn = turn === player;

  let best = playerTurn ? -Infinity : Infinity;

  const compare = playerTurn ? ((a, b) => a > b ? a : b) : ((a, b) => a < b ? a : b); 

  for (let i of available) {

    board[i] = turn;

    best = compare(best, getPositionScore(board, playerTurn ? opponent : player, player, opponent));

    board[i] = 0;
  }

  return best;
}

export function getNextPlayPosition(prevBoard, player, opponent, skill) {
  
  console.log(player, skill);

  const board = [...prevBoard];

  const available = findEmptySpaces(board);

  if ('low' === skill) {
    return pickRandom(available);
  }

  // 1. Find a winning move
  
  for (let i of available) {
    for (let line of paths[i]) {
      if (board[line[0]] === player && board[line[1]] === player) {
        return i;
      }
    }
  }

  // 2. Or find a defensive move

  for (let i of available) {
    for (let line of paths[i]) {
      if (board[line[0]] === opponent && board[line[1]] === opponent) {
        return i;
      }
    }
  }

  if ('medium' === skill) {
    return pickRandom(available);
  }

  // 3. Find a move which eliminates the opponent's greatest path to victory

  let bestPosition = [];
  let bestScore = -Infinity;

  for (let i of available) {

    board[i] = player;

    const score = getPositionScore(board, opponent, player, opponent);

    board[i] = PLAYER_EMPTY;

    if (score > bestScore) {
      bestScore = score;
      bestPosition = [i];
    }
    else if (score === bestScore) {
      bestPosition.push(i);
    }
  }

  return bestPosition.length > 0 ? pickRandom(bestPosition) : -1;
}
