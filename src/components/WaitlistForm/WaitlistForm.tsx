import { FC, useEffect, useState } from 'react'
import { User } from '@supabase/supabase-js';
import isEmail from 'validator/es/lib/isEmail'
import cn from 'classnames'
import { supabase } from '../../libs/supabaseClient'
import { Button } from '../Button/Button';
import { ReactComponent as ArrowIcon } from '../../assets/arrow.svg';
import { ReactComponent as CopyIcon } from '../../assets/copy.svg';
import styles from './WaitlistForm.module.scss'

type WaitlistFormProps = {
  className?: string
  status?: string
  user?: User
  changeStatusFunc: (status: string) => void
}

export const WaitlistForm: FC<WaitlistFormProps> = ({ className, status, user, changeStatusFunc }) => {
  // const [status, setStatus] = useState('sent')
  const [email, setEmail] = useState('')
  const [isValid, setValidStatus] = useState(true)
  const [isCopied, setCopyStatus] = useState(false)
  const [referalLink, setReferalLink] = useState('')

  useEffect(() => {
    setReferalLink(window.location.origin + '/?ref=2356345')
  }, [])

  const onChange = (email: string) => {
    setEmail(email)
    if (email?.length) {
      setValidStatus(isEmail(email))
    }
  }

  const handleFormSubmit = async () => {
    if (!supabase || !email || !isValid) return
    changeStatusFunc('sending')
    const res = await supabase.auth.signIn({ email })
    if (res.error) {
      changeStatusFunc('error')
      return
    }
    changeStatusFunc('sent')
  }

  const onSubmit = (event: any) => {
    event.preventDefault()
  }

  const copyLink = () => {
    navigator.clipboard.writeText(referalLink).then(() => {
      console.log('Copied to clipboard')
    })
    setCopyStatus(true)
    setTimeout(() => {
      setCopyStatus(false)
    }, 2000)
  }

  const emailForm = (
    <form className={styles.form} onSubmit={onSubmit}>
      <input
        placeholder='Email Address'
        type='email'
        name='email'
        required
        className={styles.input}
        onChange={(event) => onChange?.(event.target.value)}
      />
      <Button onClick={handleFormSubmit} disabled={!email || !isValid} loading={status === 'sending'}>
        Join Waitlist <ArrowIcon className={styles.arrowIcon} />
      </Button>
    </form>
  )

  const userLinkBlock = (
    <div className={styles.form}>
      <span className={styles.referalLink}>{referalLink}</span>
      <Button onClick={copyLink} disabled={isCopied}>
        {isCopied ? <>Copied ✔️</> : <>Copy <CopyIcon className={styles.copyIcon} /></>}
      </Button>
    </div>
  )

  return (
    <div className={cn(styles.wrapper, className)}>
      {user ? userLinkBlock : emailForm}
      {status === 'error' && <div className={styles.errorMessage}>Somesing wrong, please try again...</div>}
    </div>
  )
}