import React from 'react';
// import { Link } from 'react-router-dom';
import Link from 'next/link';

// import { Storage } from '../../storage/storage';
import { Box } from './board-box';
import styles from '../styles/board.module.css';

// import * as utils from '../utils/functions';

export class Board extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      boxes: this.props.boxes,
      currentPlayer: this.props.currentPlayer,
      isGameFinished: this.props.isGameFinished
    }
  }

  // User press a box in the board
  handlePressBox(index) {
    if (!this.state.isGameFinished && this.state.boxes[index] == null) {
      const board = this.state.boxes;
      const currentPlayer = this.state.currentPlayer;

      // Make movement and return new board
      const newBoard = this.makeMovement(index, board);
      // Check if player won the game
      const isGameFinished = this.checkIfPlayerWin(newBoard, currentPlayer);
      // If the game did not finish, change player
      const nextPlayer = isGameFinished ? currentPlayer : this.changePlayer(currentPlayer);
      // Save state and save current game
      const newState = {
        boxes: newBoard,
        currentPlayer: nextPlayer,
        isGameFinished: isGameFinished
      }
      // Update state
      this.setState(newState);
      // Update game in local storage
      this.props.saveCurrentGame(newState);
      // If game finished, add game to history
      if (isGameFinished) {
        this.props.addGameToHistory(newBoard);
      }
    }
  }

  restartGame() {
    // Restart new game
    this.setState({
      boxes: Array(9).fill(null),
      isGameFinished: false
    }, () => {
      // Update current game in local storage
      this.props.saveCurrentGame(this.state);
    });
  }

  render() {
    return (
      <div className={styles.container}>
        <h1 className={styles.title}>Tic Tac Toe</h1>
        <span><p className={styles.description}>Player {this.state.currentPlayer} turn</p></span>
        {this.state.isGameFinished &&
          <h2>Jugador '{this.state.currentPlayer}' won !</h2>}
        <div className={styles.board}>
          <span className={styles.row}>
            <Box value={this.state.boxes[0]} onclick={() => this.handlePressBox(0)} />
            <Box value={this.state.boxes[1]} onclick={() => this.handlePressBox(1)} />
            <Box value={this.state.boxes[2]} onclick={() => this.handlePressBox(2)} />
          </span>
          <span className={styles.row}>
            <Box value={this.state.boxes[3]} onclick={() => this.handlePressBox(3)} />
            <Box value={this.state.boxes[4]} onclick={() => this.handlePressBox(4)} />
            <Box value={this.state.boxes[5]} onclick={() => this.handlePressBox(5)} />
          </span>
          <span className={styles.row}>
            <Box value={this.state.boxes[6]} onclick={() => this.handlePressBox(6)} />
            <Box value={this.state.boxes[7]} onclick={() => this.handlePressBox(7)} />
            <Box value={this.state.boxes[8]} onclick={() => this.handlePressBox(8)} />
          </span>
        </div>
        <a className={styles.button} onClick={() => this.restartGame()}>Press here to restart</a>
        <Link href="/"><a className={styles.button}>Go to menu</a></Link>
      </div>
    );
  }

  // UTILS *************************************
  changePlayer(currentPlayer) {
    return currentPlayer == 'X' ? 'O' : 'X';
  }

  makeMovement(index, board) {
    let copyBoard = board;
    copyBoard[index] = this.state.currentPlayer;

    return copyBoard;
  }

  checkIfPlayerWin(boxes, currentPlayer) {
    let gameFinished = false;
    const combinationsToWin = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let i = 0; i < combinationsToWin.length; i++) {
      if (boxes[combinationsToWin[i][0]] === currentPlayer &&
        boxes[combinationsToWin[i][1]] === currentPlayer &&
        boxes[combinationsToWin[i][2]] === currentPlayer
      ) {
        gameFinished = true;
      }
    }
    return gameFinished;
  }

}