import React from 'react'
import { Button } from 'antd'
import {
  MutedOutlined,
  SoundOutlined,
} from '@ant-design/icons'
import styles from './Mute.module.scss'

type MuteButtonProps = {
  startGameSound: VoidFunction
  stopGameSound: VoidFunction
  muted: boolean
  setMuted: (muted: boolean) => void
}

const MuteButton: React.FC<MuteButtonProps> = ({
  startGameSound,
  stopGameSound,
  muted,
  setMuted,
}) => {
  const handleMuteButton = () => {
    if (muted) {
      startGameSound()
    } else {
      stopGameSound()
    }
    setMuted(!muted)
  }

  return (
    <Button
      className={styles.button}
      onClick={handleMuteButton}>
      {muted ? (
        <MutedOutlined />
      ) : (
        <SoundOutlined />
      )}
    </Button>
  )
}

export default MuteButton
