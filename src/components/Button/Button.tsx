import React, { FC, ReactNode } from 'react'
import cn from 'classnames';
import styles from './Button.module.scss'

type ButtonProps = {
  children: ReactNode | string
  disabled?: boolean
  loading?: boolean
  onClick: () => void
  className?: string
}

const Button: FC<ButtonProps> = (
  { children,
    disabled,
    loading,
    onClick,
    className
  }) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={cn(styles.Button, className, {[styles.loading]: loading})}
    >
      {children}
    </button>
  )
}

export default React.memo(Button)
