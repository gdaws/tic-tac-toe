import {useEffect, useState} from 'react';
import { useRouter } from 'next/router';
import Page from '../../components/layout/Page';
import Overlay from '../../components/layout/Overlay';
import Box3Container from '../../components/layout/Box3Container';
import Centered from '../../components/layout/Centered';
import MainMenu from '../../components/forms/MainMenu';
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

function GameOver({play, draw}) {

  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!visible) {
      setTimeout(() => {
        setVisible(true);
      }, 10);
    }
  });

  return (
    <Overlay onClick={play}>
      <Centered>
        <div className={styles.gameoverOverlay} style={{opacity: visible ? '1' : '0'}}>
          <button onClick={play} className={styles.playButton}>Play Again</button>
        </div>
      </Centered>
    </Overlay>
  );
}

function MainMenuOverlay({playerConfig, onHide, onSubmit}) {

  return (
    <Overlay onClick={onHide}>
      <Centered>
        <MainMenu 
          value={playerConfig} 
          onSubmit={onSubmit} />
      </Centered>
    </Overlay>
  );
}

function PlayPage({playerX, playerO}) {

  const router = useRouter();

  const [menu, setMenu] = useState(false);

  const [game, setGame] = useState({
    round: 0,
    finished: false,
    turn: null,
    playerX,
    playerO
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

  const handleMainMenuClick = () => {
    setMenu(true);
  };

  const playNewGame = (config) => {
    router.push(generateUrl(config));
  };

  return (
    <Page>
      <Overlay>
        <Box3Container>
          <div className={styles.topMenu}>
            <Player mark="X" score={score.tally[0]} selected={game.turn == PLAYER_X} />
            <Player mark="O" score={score.tally[1]} selected={game.turn == PLAYER_O} />
            <button onClick={handleMainMenuClick}>Main Menu</button>
          </div>
          <div className={styles.gameArea}>
            {game.finished ? <GameOver play={handlePlay} draw={score.winner === null} /> : null} 
            <Game id={game.round} playerX={game.playerX} playerO={game.playerO} onPlayerTurn={handlePlayerTurn} onGameOver={handleGameOver} />
          </div>
        </Box3Container>
      </Overlay>
      {menu ? <MainMenuOverlay playerConfig={{playerX, playerO}} onHide={() => setMenu(false)} onSubmit={playNewGame} /> : null }
    </Page>
  );
}

export function generateUrl(config) {
  
  const token = (player) => {
  
    if ('human' === player.type) {
      return 'p';
    }

    switch (player.skill) {
      case 'low':
        return 'c1';
      case 'medium':
        return 'c2';
      case 'high':
        return 'c3';
    }

    return 'p';
  };

  return `/play/${token(config.playerX)}v${token(config.playerO)}.html`;
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

export default PlayPage;
