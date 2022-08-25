import React from 'react'
import cn from 'classnames'
import Button from '../Button';
import {ReactComponent as ArrowIcon} from '../../assets/arrow.svg';
import axios from 'axios';
import {useDispatch, useSelector} from 'react-redux';
import {isEmailSent} from '../../store/userSlice';
import styles from './WaitlistForm.module.scss'
import HCaptcha from '@hcaptcha/react-hcaptcha';
import {setLoading, setError} from '../../store/serviceSlice';

type WaitlistFormProps = {
  className?: string
  error?: string
  fromReferral?: string
}

const isValidEmail = (email:string) => {
  return /\S+@\S+\.\S+/.test(email);
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
  const handleValidate = () => {
    if (!isValidEmail(email)) {
      dispatch(setError('Invalid email format'))

    }
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
      dispatch(isEmailSent(false))
      dispatch(setLoading(false))
      dispatch(setError(error.response.data.error))
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
          onBlur={handleValidate}
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
