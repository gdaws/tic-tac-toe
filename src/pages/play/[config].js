import Game from '../../core/gui/game';

function Page({playerX, playerO}) {
  return (
    <div>
      <Game playerX={playerX} playerO={playerO} />
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
