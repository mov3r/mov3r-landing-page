import { FC, ReactNode } from 'react'
import cn from 'classnames'
import { Spinner } from '../Spinner/Spinner';
import styles from './Button.module.scss'

type ButtonProps = {
  children: ReactNode | string
  disabled?: boolean
  loading?: boolean
  onClick: () => void
}

export const Button: FC<ButtonProps> = (
  { children,
    disabled,
    loading,
    onClick
  }) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled || loading}
      className={cn(styles.Button, styles.loading, {[styles.loading]: loading})}
    >
      {children}
      {loading && <Spinner className={styles.spinner} />}
    </button>
  )
}
