import React, { useRef, useEffect } from 'react';
import { Game, PLAYER_X, PLAYER_O } from '../game';
import { getNextPlayPosition } from '../game/bot';
import { signal, sleep } from '../async';
import { render } from '../gui';

export function human() {
  return {type: 'human'};
}

export function bot() {
  return {type: 'bot'};
};

function createHumanPlayerController(input) {
  return () => input.wait();
}

function createBotPlayerController(game, player, skill) {
  return async () => {
    await sleep(200);
    return getNextPlayPosition(game.board, player, player === PLAYER_X ? PLAYER_O : PLAYER_X, skill);
  };
}

export default function GameComponent(props) {

  const container = useRef(null);

  useEffect(() => {

    const mount = container.current;

    if (!mount) {
      return;
    }

    const game = new Game();
    const clickInputSource = signal();

    const createController = (player, playerId) => {

      if (!player) {
        player = human();
      }

      switch (player.type) {
        case 'human':
          return createHumanPlayerController(clickInputSource);
        case 'bot':
          return createBotPlayerController(game, playerId, player.skill);
      }
    };

    const controllers = {
      [PLAYER_X]: createController(props.playerX, PLAYER_X),
      [PLAYER_O]: createController(props.playerO, PLAYER_O)
    };

    const view = () => {
      render(mount, game, (position) => {
        clickInputSource.emit(position);
      });
    };

    let runable = true;

    const run = async () => {

      try {
        while (runable && !game.finished()) {
        
          view();
    
          const input = controllers[game.turn]();

          if (props.onPlayerTurn) {
            props.onPlayerTurn(game.turn);
          }

          game.play(await input);
        }
      }
      catch (error) {
        return;
      }

      view();
  
      props.onGameOver({winner: game.winnerPlayer(), moves: game.moves});
    };

    run();

    return () => {
      runable = false;
      clickInputSource.interrupt(new Error('game shutdown'));
    };
  }, [props.id]);

  return (
    <div className="board" ref={container} />
  );
}
