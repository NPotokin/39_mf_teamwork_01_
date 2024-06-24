import React, { useState } from 'react'
import styles from './styles.module.scss'
import pandaStart from '@images/panda_start.svg'
import pandaWin from '@images/panda_win.svg'
import pandaLost from '@images/panda_over.svg'
import { GameModal } from '@/components'

const Game: React.FC = () => {
  const [isStartModalVisible, setIsStartModalVisible] = useState(true)
  const [isGameVisible, setIsGameVisible] = useState(false)
  const [isGameOverVisible, setIsGameOverVisible] = useState(false)
  const [isGameWinVisible, setIsGameWinVisible] = useState(false)

  const handleStartModalButton = () => {
    setIsStartModalVisible(false)
    setIsGameVisible(true)
    setIsGameWinVisible(false)
    setIsGameOverVisible(false)
  }

  const handleVictory = () => {
    setIsGameWinVisible(true)
    setIsGameVisible(false)
  }

  const handleDefeat = () => {
    setIsGameOverVisible(true)
    setIsGameVisible(false)
  }

  return (
    <div className={styles.game}>
      {/* Temporary mock game div */}
      {isGameVisible && (
        <div>
          <h1 className="nes-text is-disabled">This is temporary</h1>
          <button onClick={handleDefeat}>Click to lose</button>
          <button onClick={handleVictory}>Click to win</button>
        </div>
      )}
      {/* Start game modal */}
      <GameModal
        visible={isStartModalVisible}
        imageSrc={pandaStart}
        title={'Start the game'}
        subtitle={'Are you ready?'}
        onYesClick={handleStartModalButton}
      />

      {/* Win game modal */}
      <GameModal
        visible={isGameWinVisible}
        imageSrc={pandaWin}
        titleClass={'nes-text is-success'}
        title={'You Win!'}
        subtitle={'Play again?'}
        onYesClick={handleStartModalButton}
      />

      {/* Lost game modal */}
      <GameModal
        visible={isGameOverVisible}
        imageSrc={pandaLost}
        titleClass={'nes-text is-warning'}
        title={'Game Over'}
        subtitle={'Play again?'}
        onYesClick={handleStartModalButton}
      />
    </div>
  )
}

export default Game
