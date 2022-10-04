import React from 'react'
import {Logo} from '../Logo/Logo';
import WaitlistForm from '../WaitlistForm';
import Social from '../Social';
import {useDispatch, useSelector} from 'react-redux';
import {setReferralLink, User} from '../../store/userSlice';
import {setSlug, setSecret, setRank, setConfirmed} from '../../store/userSlice';
import {Service, setLoading, setError, setLinkType} from '../../store/serviceSlice';
import axios from 'axios';
import styles from './HomeScreen.module.scss'
import CopyReferralLink from '../CopyReferralLink';
import Spinner from '../Spinner';
import {ReactComponent as Arrow} from '../../assets/Arrow_Left_MD.svg';

const HomeScreen: React.FC = () => {
  return (
    <div className={styles.home}>
      <div>
        <Logo className={styles.logo}/>
        <h1 className={styles.title}>The first Aptos bridge</h1>
      </div>
      <article className={styles.start}>
        <a href="https://app.mov3r.xyz/" className={styles.startButton}>Use Mover <Arrow className={styles.arrow}/></a>
      </article>

      <Social networks={['discord', 'github', 'twitter']} className={styles.social}/>
    </div>
  )
}

export default React.memo(HomeScreen)
