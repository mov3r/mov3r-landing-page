import React from 'react'
import {Logo} from '../Logo/Logo';
import WaitlistForm from '../WaitlistForm';
import Social from '../Social';
import {useDispatch, useSelector} from 'react-redux';
import {setReferralLink, User} from '../../store/userSlice';
import {setSlug, setRank, setConfirmed} from '../../store/userSlice';
import axios from 'axios';
import styles from './HomeScreen.module.scss'
import CopyReferralLink from '../CopyReferralLink';
import Spinner from '../Spinner';
import loaderSlice, {Loading, setLoading} from '../../store/loaderSlice';

const HomeScreen: React.FC = () => {
  const dispatch = useDispatch();
  const [linkType, setLinkType] = React.useState<string | undefined>(undefined)
  const [secret, setSecret] = React.useState<string | undefined>(undefined)
  const [error, setError] = React.useState<string | undefined>(undefined)
  const url = new URL(window.location.href);
  const urlPaths: string[] = url.pathname.split('/').splice(1)
  const isEmailSent = useSelector((state: User) => state.user.isEmailSent)
  const slug = useSelector((state: User) => state.user.slug)
  const rank = useSelector((state: User) => state.user.rank)
  const loading = useSelector((state: Loading) => state.loader.loading)

  React.useEffect(() => {
    switch (true) {
      case urlPaths[0] === 'c':
        setLinkType('confirmation')
        dispatch(setSlug(urlPaths[1]))
        setSecret(urlPaths[2])
        localStorage.setItem('slug', urlPaths[1])
        window.history.pushState({}, 'Mover Verification', `${url.origin}/waitlist/verify/`);
        break;
      case urlPaths[0] === 'r': setLinkType('referral')
        break;
      case urlPaths[0] === 'w': setLinkType('waitlist')
        break;
    }
  }, [])

  if (linkType === 'confirmation') {
    dispatch(setLoading(true))
    axios.post(`${process.env.REACT_APP_API_URL}/waitlist/verify/`, {
      slug,
      secret
    }).then((response) => {
      dispatch(setConfirmed(true))
      dispatch(setRank(response.data.position))
      dispatch(setReferralLink(response.data.reflink))
      dispatch(setLoading(false))
    }).catch((error) => {
      setError(error.response.data.error)
      if (error.response.data.error === 'Already confirmed') {
        dispatch(setConfirmed(true))
        axios.get(`${process.env.REACT_APP_API_URL}/waitlist/position/`, {
          params: {slug : slug},
        }).then((response) => {
          dispatch(setLoading(false))
          dispatch(setRank(response.data.position))
          dispatch(setReferralLink(response.data.reflink))
          window.history.pushState({}, 'Mover', `${url.origin}/w/${slug}/`);
        }).catch((error) => {
          dispatch(setLoading(false))
          console.log('!!! error:', error)
        })
      }
    })
  }

  return (
    <div className={styles.home}>
      <Logo className={styles.logo}/>
      <div className={styles.container}>
        {loading ? <Spinner/> : (
          isEmailSent && !error ? (
            <>
              <h1 className={styles.title}>Thanks for signing up!</h1>
              <p className={styles.text}>
                A verification email has been sent to you.
                <br/>Please verify your email to secure your
                spot on the waitlist.</p>
            </>
          ) : (
            <>
              {slug ?
                <>
                  <p className={styles.text}>Skip ahead in line by referring friends<br/>using the link below.</p>
                  <div className={styles.rank}>Your rank: <span>{rank}</span></div>
                </>
                :
                <>
                  <h1 className={styles.title}>The first Aptos bridge<br/>and cross-chain messaging protocol</h1>
                  <p className={styles.text}>Join the WaitList to be the first<br/> to access the platform.</p>
                </>
              }
              { rank ? <CopyReferralLink className={styles.form}/> : <WaitlistForm className={styles.form}/> }
            </>
          )
        )}
      </div>

      <Social networks={['discord', 'github', 'twitter']} className={styles.social}/>
    </div>
  )
}

export default React.memo(HomeScreen)
