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

const HomeScreen: React.FC = () => {
  const dispatch = useDispatch();
  const [referrer, setReferrer] = React.useState<string | undefined>(undefined)
  // const [urlPaths, setUrlPaths] = React.useState<string[] | undefined>(undefined)
  const isEmailSent = useSelector((state: User) => state.user.isEmailSent)
  const slug = useSelector((state: User) => state.user.slug)
  const secret = useSelector((state: User) => state.user.secret)
  const rank = useSelector((state: User) => state.user.rank)
  const loading = useSelector((state: Service) => state.service.loading)
  const referralLink = useSelector((state: User) => state.user.referralLink)
  const error = useSelector((state: Service) => state.service.error)
  // const linkType = useSelector((state: Service) => state.service.linkType)
  const [linkType, setLinkType] = React.useState<string>('')
  const url = new URL(window.location.href);
  // setUrlPaths(url.pathname.split('/').splice(1))

  React.useEffect(() => {
    const urlPaths = url.pathname.split('/').splice(1)

    switch (true) {
      case urlPaths[0] === 'c':
        console.log('!!! confirmation:', urlPaths)
        setLinkType('confirmation')
        dispatch(setSlug(urlPaths[1]))
        dispatch(setSecret(urlPaths[2]))
        // window.history.pushState({}, 'Mover Verification', `${url.origin}/waitlist/verify/`);
        break;
      case urlPaths[0] === 'r': setLinkType('referral')
        setReferrer(urlPaths[1])
        break;
      case urlPaths[0] === 'w': setLinkType('waitlist')
        break;
    }
  }, [])

  React.useEffect(() => {
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
        return
      }).catch((error) => {
        if (error.response.data.error_code === 6) { //Already confirmed
          dispatch(setLoading(true))
          setLinkType('waitlist')
        }
        dispatch(setLoading(false))
        dispatch(setError(error.response.data.error))
        return
      })
    } else if (linkType === 'waitlist') {
      dispatch(setLoading(false))
      // проверяем свою позицию в рейтинге
      axios.get(`${process.env.REACT_APP_API_URL}/waitlist/position/`, {
        params: {slug: slug},
      }).then((response) => {
        dispatch(setLoading(false))
        dispatch(setRank(response.data.position))
        dispatch(setReferralLink(response.data.reflink))
        // window.history.pushState({}, 'Mover', `${url.origin}/w/${slug}/`);
      }).catch((error) => {
        window.location.href= '/'
        console.log('!!! error:', error)
      }).finally(() => {
        dispatch(setLoading(false))
      })
    }
  }, [])

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
              { linkType === 'waitlist' && rank ?
                <>
                  <p className={styles.text}>Skip ahead in line by referring friends<br/>using the link below.</p>
                  <div className={styles.rank}>Your rank: <span>{rank}</span></div>
                </>
                :
                <>
                  <h1 className={styles.title}>The first Aptos bridge</h1>
                  <p className={styles.text}>
                    Join the waitlist to be the first
                    <br/>
                    to access our Private Alpha
                  </p>
                </>
              }
              { referralLink ?
                <CopyReferralLink className={styles.form}/>
                :
                <WaitlistForm
                  fromReferral={referrer}
                  error={error}
                  className={styles.form}
                />
              }
            </>
          )
        )}
      </div>

      <Social networks={['discord', 'github', 'twitter']} className={styles.social}/>
    </div>
  )
}

export default React.memo(HomeScreen)
