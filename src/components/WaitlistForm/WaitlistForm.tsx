import React from 'react'
import cn from 'classnames'
import Button from '../Button';
import {ReactComponent as ArrowIcon} from '../../assets/arrow.svg';
import axios from 'axios';
import {useDispatch, useSelector} from 'react-redux';
import {isEmailSent, setSlug} from '../../store/userSlice';
import styles from './WaitlistForm.module.scss'
import HCaptcha from '@hcaptcha/react-hcaptcha';
import {setLoading, setError, setLinkType} from '../../store/serviceSlice';

type WaitlistFormProps = {
  className?: string
  error?: string
  fromReferral?: string
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
  const handleFormSubmit = async () => {
    setShowCaptha(true)
  }

  React.useEffect(() => {
    if (!token) return
    dispatch(setLoading(true))
    axios.post(`${process.env.REACT_APP_API_URL}/waitlist/add/`, {
      hcaptcha: token,
      email: email,
      referrer: props.fromReferral
    }).then(() => {
      dispatch(isEmailSent(true))
      dispatch(setLoading(false))
    }).catch(function (error) {
      if (error.response.data.error_code === 1) {//This email has been already used
        dispatch(setLoading(false))
        dispatch(setSlug(error.response.data.slug))
        window.location.href=`/w/${error.response.data.slug}`
        dispatch(setLoading(false))
      }
      dispatch(isEmailSent(false))
      dispatch(setLoading(false))
      // dispatch(setError(error.response.data.error))
    }).finally(() => {
      if (captcha.current) captcha.current.resetCaptcha();
      setToken(undefined);
      setShowCaptha(false)
    })
  }, [token])

  return (
    <div className={cn(styles.wrapper, props.className)}>
      <div className={styles.form}>
        <input
          placeholder='Email Address'
          type='email'
          name='email'
          required
          className={styles.field}
          onChange={handleInputChange}
        />
        <Button
          className={styles.button}
          disabled={!email || Boolean(props.error) || showCaptha && !token}
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
