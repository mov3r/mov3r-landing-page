import React, { FC } from 'react'
import cn from 'classnames'
import { ReactComponent as DiscordIcon } from '../../assets/discord.svg';
import { ReactComponent as GithubIcon } from '../../assets/git.svg';
import { ReactComponent as TwitterIcon } from '../../assets/twitter.svg';
import { ReactComponent as MediumIcon } from '../../assets/medium.svg';
import styles from './Social.module.scss'

type SocialProps = {
  networks: string[]
  className?: string
}

const Social: FC<SocialProps> = ({ networks, className }) => {
  return (
    <div className={cn(styles.wrapper, className)}>
      {networks.includes('discord') && <a href="https://discord.gg/pjUCVvfj" target="_blank" rel="noreferrer noopener">
        <DiscordIcon />
      </a>}
      {networks.includes('github') && <a href="/#" target="_blank" rel="noreferrer noopener">
        <GithubIcon />
      </a>}
      {networks.includes('twitter') && <a href="https://twitter.com/moverxyz" target="_blank" rel="noreferrer noopener">
        <TwitterIcon />
      </a>}
      {networks.includes('medium') && <a href="/#" target="_blank" rel="noopener">
        <MediumIcon />
      </a>}
    </div>
  )
}

export default React.memo(Social)
