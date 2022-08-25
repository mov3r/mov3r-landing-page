import React, { FC } from 'react'
import cn from 'classnames'
import styles from './Spinner.module.scss'

type SpinnerProps = {
  className?: string
}

const Spinner: FC<SpinnerProps> = ({ className }) => {
  return (
    <div className={cn(styles.Spinner, className)}>
      <div className={styles.holder}>
        {[...Array(12)].map((name, index) => <div key={index} className={styles.spinnerBlade}/>)}
      </div>
    </div>
  )
}

export default React.memo(Spinner)
