import {
  useCallback,
  useEffect,
  MutableRefObject,
  useState,
} from 'react'

import {} from 'react'

import { Layout, Button } from 'antd/lib'

import classNames from 'classnames'

import { Constants } from './constants'

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

import useFullscreen from './hooks/useFullScreen'
import { useAppSelector } from '../../lib/hooks/redux'
import LeaderboardApi from '../../core/api/leaderBord.api'
import MuteButton from '../../components/MuteButton/MuteButton'
import { Footer, Header } from '../../components'

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
  const leaderboardApi = new LeaderboardApi()
  const userLogin = useAppSelector(
    state => state.user.login
  )
  const userAvatar = useAppSelector(
    state => state.user.avatar
  )
  useEffect(() => {
    if (
      modals.isGameOverVisible ||
      modals.isGameWinVisible
    ) {
      submitScore()
    }
  }, [
    modals.isGameOverVisible,
    modals.isGameWinVisible,
  ])

  const submitScore = useCallback(() => {
    leaderboardApi
      .submitScore(
        userLogin,
        gameLogic.score,
        userAvatar
      )
      .catch(error => {
        console.error(
          'Error submitting score:',
          error
        )
      })
  }, [gameLogic.score, userLogin])

  const {
    isFullscreen,
    handleFullscreen,
    elementRef,
  } = useFullscreen()

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

  return (
    <Layout>
      <div
        className={classNames(
          styles.game,
          'page'
        )}
        ref={
          elementRef as
            | MutableRefObject<HTMLDivElement>
            | undefined
        }>
        {!isFullscreen && <Header isGamePage />}

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
              <div className={styles.btnGame}>
                <Button
                  onClick={handleFullscreen}
                  className="nes-btn">
                  Fullscreen
                </Button>
              </div>
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
        {!isFullscreen && <Footer />}
      </div>
    </Layout>
  )
}

export default Game
