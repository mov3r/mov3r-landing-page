import { FC } from 'react'
import { NavLink } from 'react-router-dom'
import { ReactComponent as LogoIcon } from '../../assets/logo.svg'
import { ReactComponent as BrandIcon } from '../../assets/brand.svg'
import cn from 'classnames'
import styles from './Logo.module.scss'

type LogoProps = {
  to?: string
  className?: string
  showLogo?: boolean
  showBrand?: boolean
}

export const Logo: FC<LogoProps> = ({ to, className, showLogo = true, showBrand = true }) => {
  const wrapper = () => {
    return (
      <>
        {showLogo && <LogoIcon className={styles.logo} />}
        {showBrand && <BrandIcon className={styles.brand} />}
      </>
    )
  }

  if (to) {
    return (
      <NavLink to={to} className={cn(styles.wrapper, className)}>
        {wrapper()}
      </NavLink>
    )
  }

  return (
    <div className={cn(styles.wrapper, className)}>
      {wrapper()}
    </div>
  )
}