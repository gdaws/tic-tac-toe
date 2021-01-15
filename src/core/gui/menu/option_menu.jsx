import React, { useState } from 'react';
import styles from './option_menu.module.css';

function PlayerSelect(props) {

  let skillLevelSelect;

  const change = (name) => (event) => {

    const value = event.target.value;

    let base;

    if ('type' == name) {
      base = 'human' === value ? {} : {skill: 'medium'};
    }
    else {
      base = props.value;
    }

    props.onChange({...base, [name]: value});
  }; 

  if ('bot' === props.value.type) {
    skillLevelSelect = (
      <select value={props.value.skill} onChange={change('skill')}>
        <option value="low">Blind</option>
        <option value="medium">Beginner</option>
        <option value="high">Master</option>
      </select>
    );
  }

  return (
    <React.Fragment>
      <select value={props.value.type} onChange={change('type')}>
        <option value="human">Player</option>
        <option value="bot">Bot</option>
      </select>
      {skillLevelSelect}
    </React.Fragment>
  );
}

export default function OptionMenu(props) {

  const [playerX, setPlayerX] = useState({...props.value.playerX});
  const [playerO, setPlayerO] = useState({...props.value.playerO});

  const submitHandler = (event) => {
    event.preventDefault();
    props.onSubmit({playerX, playerO});
  };

  return (
    <form onSubmit={submitHandler} className={styles.container}>
      <div className={styles.top}>
        <div className={styles.iconLogo} />
      </div>
      <div className={styles.middle}>
        <div className={styles.formGroup}>
          <label>X</label>
          <PlayerSelect value={playerX} onChange={setPlayerX} />
        </div>
        <div className={styles.formGroup}>
          <label>O</label>
          <PlayerSelect value={playerO} onChange={setPlayerO} />
        </div>
      </div>
      <div className={styles.bottom}>
        <button className={styles.btn}>Play</button>
      </div>
    </form>
  );
}
