import React from 'react';
import Link from 'next/link';
import styles from '../styles/index.module.css'

export default function Index() {
  return (
    <div>
    <div className={styles.container}>
      <h1 className={styles.title}>Tic tac toe</h1>
      <p className={styles.description}>Play the classic tic tac toe with
        your best friend, or try to challenge your
        versus our invencible IA.</p>
        <Link href="/game"><a className={styles.button}>Play vs player</a></Link>
        <Link href="/game"><a className={styles.button}>Play vs computer</a></Link>
        <Link href="/game"><a className={styles.button}>Play online with friends</a></Link>
        <Link href="/history"><a className={styles.button}>History</a></Link>
    </div>
    <img src={require('../../public/images/home.jpg')} className={styles.img} />
    <style jsx global>{`
      body {
        background-color: #363640;
        color: white;
        font-family: monospace;
      },
      `}</style>
      </div>
  );
}