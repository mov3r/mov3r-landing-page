import React from 'react'
import './Button.scss'

type Props = {
  child: React.ReactNode | string
  onClick: () => void
}

const Button: React.FC<Props> = (props) => {
  return (
    <div
      onClick={props.onClick}
      className="Button"
    >
      <div className="inner">
        {props.child}
      </div>
    </div>
  )
}

export default React.memo(Button)
