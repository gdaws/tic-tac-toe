import {useState} from 'react';
import {PLAYER_X, PLAYER_O} from '../../core/game';
import Game from '../../core/gui/game';
import styles from '../../styles/Play.module.css';

function Player({mark, score, selected}) {

  return (
    <div className={styles.player + ' ' + (selected ? styles.selected : '')}>
      <span className={styles.playerMark}>{mark}</span>
      <span className={styles.playerScore}>{score}</span>
    </div>
  );
}

function Page({playerX, playerO}) {

  const [game, setGame] = useState({
    round: 0,
    finished: false,
    turn: null
  });

  const [score, setScore] = useState({
    tally: [0, 0],
    winner: null
  });

  const handleGameOver = ({winner}) => {

    setGame({
      ...game,
      finished: true,
      turn: null
    });

    setScore({
      tally: [winner == 1 ? score.tally[0] + 1 : score.tally[0], winner == 2 ? score.tally[1] + 1 : score.tally[1]],
      winner
    });
  };

  const handlePlay = () => {
    setGame({...game, finished: false, round: game.round + 1});
  };

  const handlePlayerTurn = (turn) => {
    setGame({...game, turn});
  };

  return (
    <div>
      <div className={styles.topMenu}>
        <Player mark="X" score={score.tally[0]} selected={game.turn == PLAYER_X} />
        <Player mark="O" score={score.tally[1]} selected={game.turn == PLAYER_O} />
        <button type="button" onClick={handlePlay}>Restart Game</button>
      </div>
      <Game id={game.round} playerX={playerX} playerO={playerO} onPlayerTurn={handlePlayerTurn} onGameOver={handleGameOver} />
    </div>
  );
}

export async function getStaticPaths() {

  const playerTypes = ['p', 'c1', 'c2', 'c3'];

  const paths = [];

  for (const x of playerTypes) {
    for (const o of playerTypes) {
      paths.push({params: {config: `${x}v${o}`}});
    }
  }

  return {
    paths,
    fallback: false
  }
}

export async function getStaticProps(context) {

  const elements = context.params.config.match(/^(p|c\d)v(p|c\d)$/);

  if (!elements) {
    throw new Error('invalid config token');
  }

  const playerConfig = (id) => {
    switch (id) {
      case 'p':
        return {type: 'human'};
      case 'c1':
        return {type: 'bot', skill: 'low'};
      case 'c2':
        return {type: 'bot', skill: 'medium'};
      case 'c3':
        return {type: 'bot', skill: 'high'};
    }
  };

  return {props: {
    playerX: playerConfig(elements[1]), 
    playerO: playerConfig(elements[2])
  }};
}

export default Page;
