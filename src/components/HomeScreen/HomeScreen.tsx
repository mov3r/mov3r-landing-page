import { FC } from 'react'
import { Logo } from '../Logo/Logo';
import { WaitlistForm } from '../WaitlistForm/WaitlistForm';
import { Social } from '../Social/Social';
import styles from './HomeScreen.module.scss'

export const HomeScreen: FC = () => {
  return (
    <div className={styles.home}>
      <Logo className={styles.logo} />
      <h1 className={styles.title}>The first Aptos bridge<br />and cross-chain messaging protocol</h1>
      <p className={styles.text}>Join the WaitList to be the first<br/> to access the platform</p>
      <WaitlistForm className={styles.form} />
      <Social networks={['discord', 'github', 'twitter']} className={styles.social} />
    </div>
  )
}