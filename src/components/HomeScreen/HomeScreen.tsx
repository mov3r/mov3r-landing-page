import React from 'react'
import {Logo} from '../Logo/Logo';
import Social from '../Social';
import {ReactComponent as Twitter} from '../../assets/twitter.svg';
import styles from './HomeScreen.module.scss'

const url = new URL(window.location.href)
console.log('!!! url:', url)
const HomeScreen: React.FC = () => {
  return (
    <div className={styles.home}>
      <Logo className={styles.logo}/>
      <h1 className={styles.title}>The first Aptos bridge</h1>
      <article className={styles.start}>
        <h2>Your Discord is verified!</h2>
        <p>Your participation in the Private Alpha is now officially confirmed! </p>
        <a
          target="_blank"
          rel="noreferrer noopener"
          href={`https://twitter.com/intent/tweet?text=Hello%20world&url=${url.origin}`}
          className={styles.startButton}
        >
          Share on Twitter! <Twitter/>
        </a>
      </article>
      <Social networks={['discord', 'github', 'twitter', 'medium']} className={styles.social}/>
    </div>
  )
}

export default React.memo(HomeScreen)
