import { boxWidth, boxHeight } from './gui/constants';
import { svgRoot, rect } from './gui/svg';
import { append } from './gui/dom';
import { background, glyphs, winningLineGlyphs } from './gui/assets';
import { PLAYER_X, PLAYER_O } from './game';

export function render(mount, game, onclick) {
  
  while(mount.firstChild) {
    mount.removeChild(mount.firstChild);
  }

  const svg = svgRoot();

  append(svg, background());

  const offsetX = 10;
  const offsetY = 10;

  const board = game.board;

  for (let i = 0; i < board.length; i++) {

    const x = (i % 3) * boxWidth + offsetX;
    const y = Math.floor(i / 3) * boxHeight + offsetY;

    const player = board[i];

    const mark = glyphs[player](x, y);

    if (player === PLAYER_X || player === PLAYER_O) {
      mark.setAttribute('class', player === PLAYER_X ? 'player-x' : 'player-o');
    }

    append(svg, mark);

    const clickable = rect({
      x: x - 10,
      y: y - 10,
      width: boxWidth,
      height: boxHeight,
      fill: 'transparent'
    });

    clickable.addEventListener('click', onclick.bind(null, i));

    append(svg, clickable);
  }

  if (null !== game.winner) {
    const strikeThroughLine = winningLineGlyphs[game.winner](0, 0);
    strikeThroughLine.setAttribute('class', 'strikethrough');
    append(svg, strikeThroughLine);
  }

  mount.appendChild(svg);
}
