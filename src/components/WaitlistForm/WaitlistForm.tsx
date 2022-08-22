import React from 'react'
import cn from 'classnames'
import Button from '../Button';
import {ReactComponent as ArrowIcon} from '../../assets/arrow.svg';
import axios from 'axios';
import {useDispatch} from 'react-redux';
import {isEmailSent} from '../../store/userSlice';
import styles from './WaitlistForm.module.scss'
import HCaptcha from '@hcaptcha/react-hcaptcha';

type WaitlistFormProps = {
  className?: string
}

const isValidEmail = (email:string) => {
  return /\S+@\S+\.\S+/.test(email);
}

const WaitlistForm: React.FC<WaitlistFormProps> = (props) => {
  const [email, setEmail] = React.useState<string>('')
  const [error, setError] = React.useState<string | undefined>(undefined)
  const [token, setToken] = React.useState<string | undefined>(undefined);
  const captcha = React.useRef<HCaptcha>(null);
  const dispatch = useDispatch();
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setError(undefined)
    setEmail(event.target.value)
  }
  const handleFormSubmit = async () => {
    if (!isValidEmail(email)) {
      setError('Email is invalid')
      return
    }
    if (!token) {
      setError("You must verify the captcha");
      return;
    }
    axios.post(`${process.env.REACT_APP_API_URL}/waitlist/add/`, {
      hcaptcha: token,
      email: email
    }).then(() => {
      dispatch(isEmailSent(true))
    }).catch(function (error) {
      setError(error.response.data.error ? error.response.data.error : error.message)
      dispatch(isEmailSent(false))
    }).finally(() => {
      if (captcha.current) captcha.current.resetCaptcha();
      setToken(undefined);
    })
  }

  return (
    <div className={cn(styles.wrapper, props.className)}>
      <div className={styles.form}>
        <input
          placeholder='Email Address'
          type='email'
          name='email'
          required
          className={styles.input}
          onChange={handleInputChange}
        />
        <Button
          disabled={!email || Boolean(error) || !token}
          onClick={handleFormSubmit}>
          Join Waitlist <ArrowIcon className={styles.arrowIcon}/>
        </Button>
      </div>
      <div className={styles.hcaptcha}>
        <HCaptcha
          ref={captcha}
          theme="dark"
          sitekey={`${process.env.REACT_APP_RECAPTCHA_HEY}`}
          onVerify={token => setToken(token)}
          onExpire={() => setToken(undefined)}
        />
      </div>
      <div className={styles.messageWrapper}>
        {error && <div className={styles.errorMessage}>{error}</div>}
      </div>
    </div>
  )
}

export default React.memo(WaitlistForm)
