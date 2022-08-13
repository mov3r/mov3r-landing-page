import { FC } from 'react'
import styles from './Background.module.scss'

export const Background: FC = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.bgColor} />
      <div className={styles.bgImage} />
      <video
        autoPlay
        loop
        muted
        disablePictureInPicture
        controlsList="nodownload"
        className={styles.bgVideo} 
        poster='../../assets/noise.png'
      >
        <source src="/media/bv.hevc.mp4" type="video/mp4; codecs=hevc,mp4a.40.2" />
        <source src="/media/bv.av1.mp4" type="video/mp4; codecs=av01.0.05M.08,opus" />
        <source src="/media/bv.h264.mp4" type="video/mp4; codecs=avc1.4D401E,mp4a.40.2" />
      </video>
    </div>
  )
}