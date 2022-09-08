import React from 'react';
import Button from '../Button/Button';
import {useSelector} from 'react-redux';
import {User} from '../../store/userSlice';
import {ReactComponent as CopyIcon} from '../../assets/copy.svg';
import styles from './CopyReferralLink.module.scss';
import cn from 'classnames';

type Props = {
  className?: string
}

const CopyReferralLink: React.FC<Props> = (props) => {
  const [isCopied, setIsCopied] = React.useState<boolean>(false)
  const referralLink = useSelector((state: User) => state.user.referralLink)
  const copyLink = () => {
    if (!referralLink) return
    navigator.clipboard.writeText(referralLink).then(() => {
      console.log('Copied to clipboard')
    })
    window.gtag('event', 'copied_link', { event_category: 'referral_link' })
    setIsCopied(true)
    setTimeout(() => {
      setIsCopied(false)
    }, 2000)
  }

  return (
    <div className={styles.CopyReferralLink}>
        <div className={cn(styles.form, props.className)}>
           <span className={styles.referralLink}>
             <span className={styles.referralLinkText}>{referralLink}</span>
           </span>
           <Button onClick={copyLink} className={styles.button} disabled={isCopied}>
             {isCopied ? <>Copied ✔️</> : <>Copy <CopyIcon className={styles.copyIcon}/></>}
           </Button>
         </div>
    </div>
  )
}

export default React.memo(CopyReferralLink)
