import React from 'react'
import './Button.scss'

type Props = {
  children: React.ReactNode | string
  onClick: () => void
}

const Button: React.FC<Props> = ({children, onClick}) => {
  return (
    <button
      onClick={onClick}
      className="Button"
    >
      <div className="inner">
        {children}
      </div>
    </button>
  )
}

export default React.memo(Button)
