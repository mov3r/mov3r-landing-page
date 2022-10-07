import React from 'react';
import {Helmet} from 'react-helmet';
import {Logo} from '../Logo/Logo';
import Social from '../Social';
import {ReactComponent as Twitter} from '../../assets/twitter.svg';
import styles from './HomeScreen.module.scss';

const url = new URL(window.location.href)
const urlData = url.pathname.split('/')
const isdDiscordVerified = urlData[1] // discord_verified
const slug = urlData[2] // encouraging-aquatic-bullfinch
const secret = urlData[3] // 2fec84bac5022f0d8b4444f7b2a8cad7aaebfe56f29076d2251474d0805de7ba

const HomeScreen: React.FC = () => {
  const [imgPath, setImgPath] = React.useState<string | undefined>(undefined)
  const getApiData = async () => {
    if (!slug || !secret) return;
    const response = await fetch(
      `https://stage.mov3r.xyz/waitlist/badge/?slug=${slug}&secret=${secret}`
      )
        .then((response) => response.json())
        .catch((error) => {
          console.error('!!! Error:', error)
        })
    setImgPath(response)
  };
  React.useEffect(() => {
    getApiData()
  }, []);

  return (
    <div className={styles.home}>
      <Helmet>
        <meta name="twitter:image" content={imgPath} />
      </Helmet>
      <Logo className={styles.logo}/>
      <h1 className={styles.title}>The first Aptos bridge</h1>
      {slug && isdDiscordVerified === 'discord_verified' &&(

        <article className={styles.start}>
          <h2>Your Discord is verified!</h2>
          <p>Your participation in the Private Alpha is now officially confirmed! </p>
          <a
            target="_blank"
            rel="noreferrer noopener"
            href={`https://twitter.com/intent/tweet?text=Hello%20world&url=${url.origin}/${slug}`}
            className={styles.startButton}
          >
            Share on Twitter! <Twitter/>
          </a>
        </article>
      )}
      <Social networks={['discord', 'github', 'twitter', 'medium']} className={styles.social}/>
    </div>
  )
}

export default React.memo(HomeScreen)
