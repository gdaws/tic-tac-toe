
export const PLAYER_EMPTY = 0;
export const PLAYER_X = 1;
export const PLAYER_O = 2;

export const lines = [
  [0, 4, 8],
  [0, 1, 2],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [3, 4, 5],
  [6, 7, 8]
];

export const paths = [
  [[1, 2], [4, 8], [3, 6]],
  [[0, 2], [4, 7]],
  [[0, 1], [4, 6], [5, 8]],
  [[0, 6], [4, 5]],
  [[0, 8], [1, 7], [2, 6], [3, 5]],
  [[3, 4], [2, 8]],
  [[0, 3], [2, 4], [7, 8]],
  [[6, 8], [1, 4]],
  [[6, 7], [0, 4], [2, 5]]
];

export function findEmptySpaces(board) {
  return [0, 1, 2, 3, 4, 5, 6, 7, 8].filter(index => board[index] === PLAYER_EMPTY);
}

export function winner(board) {

  for (let i = 0; i < lines.length; i++) {

    const v1 = board[lines[i][0]];
    const v2 = board[lines[i][1]];
    const v3 = board[lines[i][2]];

    if (PLAYER_EMPTY !== v1 && v2 === v1 && v3 === v2) {
      return i;
    }
  }

  return null;
}

export class Game {

  constructor() {
    this.restart();
  }

  restart() {

    this.board = Array(9).fill(PLAYER_EMPTY);
    this.moves = [];
    this.turn = PLAYER_X;
    this.winner = null;
  }

  play(position) {

    if (null !== this.winner || PLAYER_EMPTY !== this.board[position]) {
      return;
    }

    this.board[position] = this.turn;
    this.moves.push(position);

    this.winner = winner(this.board);

    this.turn = PLAYER_X === this.turn ? PLAYER_O : PLAYER_X;
  }

  finished() {
    return null !== this.winner || findEmptySpaces(this.board).length === 0;
  }

  winnerPlayer() {
    return this.winner && this.board[lines[this.winner][0]];
  }
};
