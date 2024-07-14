import { useState } from 'react'
import { Layout } from 'antd'
import classNames from 'classnames'

import { Constants } from './constants'

import { Header, Footer } from '@/components'
import styles from './Game.module.scss'

import React from 'react'
import {
  GameOverModal,
  WinModal,
} from './utils/modal'
import { StartModal } from '../../components/GameModal/StartModal'

import useGameSounds from './hooks/useGameSounds'
import useModals from './hooks/useModals'
import useGameLogic from './hooks/useGameLogic'
import { useAppSelector } from '@/lib/hooks/redux'

import { MuteButton } from '@/components'

export type Level =
  | 'levelOne'
  | 'levelTwo'
  | 'levelThree'

const Game: React.FC = () => {
  const sounds = useGameSounds()
  const modals = useModals()
  const [level, setLevel] = useState(
    Constants.levelOne
  )
  const [muted, setMuted] = useState(true)
  const gameLogic = useGameLogic({
    level,
    sounds,
    modals,
  })

  const handleStartModalButton = (
    selectedLevel: Level,
    selectedDifficulty: string
  ) => {
    gameLogic.resetPositions()

    const levelConfig = Constants[selectedLevel]
    setLevel(levelConfig)

    gameLogic.setPlayerPosition(
      levelConfig.player.startPosition
    )
    gameLogic.setGems(
      levelConfig.gems.startPositions
    )
    switch (selectedDifficulty) {
      case 'easy':
        gameLogic.setEnemies(
          levelConfig.enemy.startPositions.easy
        )
        break
      case 'moderate':
        gameLogic.setEnemies(
          levelConfig.enemy.startPositions
            .moderate
        )
        break
      case 'hard':
        gameLogic.setEnemies(
          levelConfig.enemy.startPositions.hard
        )

        break
    }
  }
  const handleYesClickGameOverModal = () => {
    modals.hideGameOverModal()
    modals.showStartModal()
    setMuted(true)
  }

  const handleYesClickWinModal = () => {
    modals.hideGameWinModal()
    modals.showStartModal()
  }

  const userLogin = useAppSelector(
    state => state.user.login
  )

  return (
    <Layout>
      <div
        className={classNames(
          styles.game,
          'page'
        )}>
        <Header isGamePage />
        <div
          className={classNames(
            styles.canvas,
            'container'
          )}>
          <div className={styles.canvas__score}>
            <MuteButton
              stopGameSound={sounds.stopGameSound}
              startGameSound={
                sounds.playGameSound
              }
              muted={muted}
              setMuted={setMuted}
            />
            <div>
              <div>{userLogin}</div>
              <div>Steps: {gameLogic.steps}</div>
              <div>Time: {gameLogic.time}</div>
              <div>Score: {gameLogic.score}</div>
            </div>
          </div>
          <div className={styles.canvas__play}>
            <canvas
              ref={gameLogic.canvasRef}
              width={gameLogic.canvasSize.width}
              height={gameLogic.canvasSize.height}
            />
          </div>
        </div>
        <StartModal
          visible={modals.isStartModalVisible}
          onYesClick={handleStartModalButton}
        />
        <WinModal
          visible={modals.isGameWinVisible}
          onYesClick={handleYesClickWinModal}
          score={gameLogic.score}
        />
        <GameOverModal
          visible={modals.isGameOverVisible}
          onYesClick={handleYesClickGameOverModal}
          score={gameLogic.score}
        />
        <Footer />
      </div>
    </Layout>
  )
}

export default Game
