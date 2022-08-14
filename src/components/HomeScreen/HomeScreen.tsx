import { FC, useCallback, useState } from 'react'
import cn from 'classnames'
import { User } from '@supabase/supabase-js';
import { fetchUser } from '../../utils/auth'
import { Logo } from '../Logo/Logo';
import { WaitlistForm } from '../WaitlistForm/WaitlistForm';
import { Spinner } from '../Spinner/Spinner';
import { Social } from '../Social/Social';
import styles from './HomeScreen.module.scss'

export const HomeScreen: FC = () => {
  const [status, setStatus] = useState('start')
  const [isUserLoaded, setUserLoadedSatus] = useState(false)
  const [user, setUser] = useState<User>()

  const getUser: () => Promise<string | null> = useCallback(() => {
    return new Promise(() => {
      const response = fetchUser()
      if (response) {
        setUser(response)
      }
    })
  }, [])

  setTimeout(() => {
    getUser()
    setUserLoadedSatus(true)
  }, 500);

  const initialContent = (
    <>
      {!user && <h1 className={styles.title}>The first Aptos bridge<br />and cross-chain messaging protocol</h1>}
      {user ?
        <p className={styles.text}>Skip ahead in line by referring friends<br />using the link below.</p> :
        <p className={styles.text}>Join the WaitList to be the first<br/> to access the platform.</p>
      }
      {user && false && <p className={cn(styles.text, styles.rank)}>Your Rank: <b className={styles.rankCount}>104039</b></p> }
      <WaitlistForm className={styles.form} user={user} status={status} changeStatusFunc={(status) => setStatus(status)} />
    </>
  )

  const finalContent = (
    <>
      <h1 className={styles.title}>Thanks for signing up!</h1>
      <p className={styles.text}>A verification email has been sent to you.<br />Please verify your email to secure your spot on the waitlist.</p>
    </>
  )

  const content = status === 'sent' ? finalContent : initialContent

  return (
    <div className={styles.home}>
      <Logo className={styles.logo} />
      {isUserLoaded ? content :  <div className={styles.spinner}><Spinner /></div>}
      <Social networks={['discord', 'github', 'twitter']} className={styles.social} />
    </div>
  )
}