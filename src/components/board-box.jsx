import React from 'react';
import styles from '../styles/board.module.css';

export const Box = (props) => {
  return (
    <button className={styles.box} onClick={props.onclick}>
      {props.value}
    </button>
  )
};