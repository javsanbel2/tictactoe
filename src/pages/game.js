import React from 'react';
import { Board } from "../components/board";
import {useLocalStorage} from '../utils';

export default function Game() {

  const [game, setGame] = useLocalStorage('currentGame', {
    boxes: Array(9).fill(null),
    currentPlayer: 'X',
    isGameFinished: false
  });

  const saveCurrentGame = (childData) => {
    setGame(childData);
  };

  const addGameToHistory = (game) => {
    let gamesHistory = JSON.parse(window.localStorage.getItem('gamesHistory'));
    if (!gamesHistory) {
      gamesHistory = [];
    }
    gamesHistory.push(game);
    window.localStorage.setItem('gamesHistory', JSON.stringify(gamesHistory));
  }
  
  return (
    <div>
      <Board boxes={game.boxes} currentPlayer={game.currentPlayer}
        isGameFinished={game.isGameFinished} saveCurrentGame={saveCurrentGame}
        addGameToHistory={addGameToHistory}/>
    </div>
  );
}