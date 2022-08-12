import React from 'react'
import {ReactComponent as Discord} from '../../assets/discord.svg';
import {ReactComponent as Github} from '../../assets/git.svg';
import {ReactComponent as Twitter} from '../../assets/twitter.svg';
import {ReactComponent as Medium} from '../../assets/medium.svg';
import './Social.scss'

type Props = {}

const Social: React.FC<Props> = (props) => {
  return (
    <div className="Social">
      <a href="https://discord.gg/pjUCVvfj" target="_blank" rel="noreferrer noopener">
        <Discord/>
      </a>
      <a href="" target="_blank" rel="noreferrer noopener">
        <Github/>
      </a>
      <a href="https://twitter.com/moverxyz" target="_blank" rel="noreferrer noopener">
        <Twitter/>
      </a>
      {/*<a href="" target="_blank" rel="noopener">*/}
      {/*  <Medium/>*/}
      {/*</a>*/}
    </div>
  )
}

export default React.memo(Social)
