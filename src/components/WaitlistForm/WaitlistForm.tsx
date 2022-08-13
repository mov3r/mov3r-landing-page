import { FC } from 'react'
import cn from 'classnames'
import Button from '../Button';
import { ReactComponent as ArrowIcon } from '../../assets/arrow.svg';
import styles from './WaitlistForm.module.scss'

type WaitlistFormProps = {
  className?: string
}

export const WaitlistForm: FC<WaitlistFormProps> = ({ className }) => {
  const handleFormSubmit = () => {
    console.log('Clicked')
  }

  const onSubmit = (event: any) => {
    event.preventDefault()
    console.log('Submission prevented')
  }

  return (
    <div className={cn(styles.wrapper, className)}>
      <form className={styles.form} onSubmit={onSubmit}>
        <input placeholder='Email Address' type='email' name='email' required className={styles.input} />
        <Button onClick={handleFormSubmit}>Join Waitlist <ArrowIcon className={styles.arrowIcon} /></Button>
      </form>
    </div>
  )
}