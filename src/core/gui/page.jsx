import React, { useState } from 'react';
import OptionMenu from './menu/option_menu';
import Game, { human, bot } from './game';

export default function Page(props) {

  const [options, setOptions] = useState({playerX: {type: 'human'}, playerO: {type: 'bot', skill: 'medium'}});
  const [play, setPlay] = useState(false);

  const submitPlayOptions = (value) => {
    console.log('page submit play options', value);
    setOptions(value);
    setPlay(true);
  };

  if (play) {
    return (
      <div className="container">
        <Game playerX={options.playerX} playerO={options.playerO} />
      </div>
    );
  }

  return (
    <div className="container">
      <OptionMenu value={options} onSubmit={submitPlayOptions} />
    </div>
  );
}
