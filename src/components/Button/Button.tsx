import { FC, ReactNode } from 'react'
import cn from 'classnames'
import { Spinner } from '../Spinner/Spinner';
import './Button.scss'

type ButtonProps = {
  children: ReactNode | string
  disabled?: boolean
  loading?: boolean
  onClick: () => void
}

export const Button: FC<ButtonProps> = ({ children, disabled, loading, onClick }) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled || loading}
      className={cn('Button', loading ? 'loading' : '')}
    >
      <div className="inner">
        {children}
        {loading && <Spinner className='spinner' />}
      </div>
    </button>
  )
}
