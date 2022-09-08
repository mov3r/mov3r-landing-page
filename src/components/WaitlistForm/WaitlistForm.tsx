import React from 'react'
import cn from 'classnames'
import Button from '../Button';
import {ReactComponent as ArrowIcon} from '../../assets/arrow.svg';
import axios from 'axios';
import {useDispatch} from 'react-redux';
import {isEmailSent} from '../../store/userSlice';
import styles from './WaitlistForm.module.scss'
import HCaptcha from '@hcaptcha/react-hcaptcha';
import {setLoading, setError} from '../../store/serviceSlice';
import ReactGA from 'react-ga'

type WaitlistFormProps = {
  className?: string
  error?: string
  fromReferral?: string
}

const isValidEmail = (email:string) => {
  const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return regex.test(email);
}

const WaitlistForm: React.FC<WaitlistFormProps> = (props) => {
  const [email, setEmail] = React.useState<string>('')
  const [token, setToken] = React.useState<string | undefined>(undefined);
  const [showCaptha, setShowCaptha] = React.useState<boolean>(false);
  const captcha = React.useRef<HCaptcha>(null);
  const dispatch = useDispatch();

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setError(undefined))
    setEmail(event.target.value)
  }

  // const gaEventTracker = useAnalyticsEventTracker('Join Waitlist');

  const handleFormSubmit = async () => {
    ReactGA.event({
      category: 'Submit email',
      action: 'Click Join button',
    });
    if (!email) return;
    if (!isValidEmail(email)) {
      dispatch(setError('Invalid email format'))
      return
    }
    setShowCaptha(true)
  }

  React.useEffect(() => {
    if (!token) return
    // dispatch(setLoading(true))
    axios.post(`${process.env.REACT_APP_API_URL}/waitlist/add/`, {
      hcaptcha: token,
      email: email,
      referrer: props.fromReferral
    }).then(() => {
      dispatch(isEmailSent(true))
      dispatch(setLoading(false))
      ReactGA.event({
        category: 'Submit email',
        action: 'Resolve HСaptcha',
      });
    }).catch(function (error) {
      if (error.response.data.error_code === 1) { // This email has been already used
        dispatch(setLoading(false))
        window.location.href=`/w/${error.response.data.slug}`
      }
      console.log('!!! error:', error.response.data.slug)
      dispatch(isEmailSent(false))
      dispatch(setLoading(false))
    }).finally(() => {
      if (captcha.current) captcha.current.resetCaptcha();
      setToken(undefined);
      setShowCaptha(false)
    })
  }, [token])

  const inputRef = React.useRef<HTMLInputElement | null>(null)

  React.useEffect(() => {
    const listener = (event: KeyboardEvent) => {
      if (document.activeElement === inputRef.current && (event.code === "Enter" || event.code === "NumpadEnter")) {
        console.log("Enter key was pressed. Run your function.");
        event.preventDefault();
        handleFormSubmit();
      }
    };
    document.addEventListener("keydown", listener);
    return () => {
      document.removeEventListener("keydown", listener);
    };
  }, []);
  return (
    <div className={cn(styles.wrapper, props.className)}>
      <div className={styles.form}>
        <input
          placeholder='Email Address'
          type='email'
          name='email'
          required
          ref={inputRef}
          className={styles.field}
          onChange={handleInputChange}
        />
        <Button
          className={styles.button}
          disabled={!email || Boolean(props.error) || (showCaptha && !token)}
          onClick={handleFormSubmit}>
          Join Waitlist <ArrowIcon className={styles.arrowIcon}/>
        </Button>
      </div>

      <div className={styles.messageWrapper}>
        {props.error && <div className={styles.errorMessage}>{props.error}</div>}
      </div>
      <div className={styles.hcaptcha}>
        {showCaptha && (
          <HCaptcha
            ref={captcha}
            theme="dark"
            sitekey={`${process.env.REACT_APP_HCAPTCHA_KEY}`}
            onVerify={token => setToken(token)}
            onExpire={() => setToken(undefined)}
          />
        )}
      </div>
    </div>
  )
}

export default React.memo(WaitlistForm)
