import { useRef, useEffect, useState, useCallback, useMemo } from 'react'
import { Layout } from 'antd'
import classNames from 'classnames'

import { Constants } from './constants'

import { Header, Footer } from '@/components'
import styles from './Game.module.scss'

import useSound from '@/lib/hooks/useSound'
import React from 'react'
import { GameOverModal, WinModal } from './utils/modal'
import { StartModal } from '../../components/GameModal/StartModal'
import { useCanvasElements } from './utils/canvasElements'
import useLoadImages from './utils/useLoadImages'

const Game: React.FC = () => {
  // Канвас и препятствия
  const [level, setLevel] = useState(Constants.levelOne)
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const timerRef = useRef<NodeJS.Timeout | null>(null)
  const obstacles = level.obstacles.startPositions
  const canvasSize = useMemo(
    () => ({
      width: level.canvas.width,
      height: level.canvas.height,
    }),
    []
  )

  // Музыкальное сопровождение
  const { playSound: playDefeatSound } = useSound('sounds/defeat.mp3')
  const { playSound: playVictorySound } = useSound('sounds/victory.mp3')
  const { playSound: playGemSound } = useSound('sounds/gem.mp3')
  const { playSound: playGameSound, stopSound: stopGameSound } = useSound(
    'sounds/game.mp3',
    0.0,
    true
  )

  // Стейты модалок
  const [isStartModalVisible, setIsStartModalVisible] = useState(true)
  const [isGameOverVisible, setIsGameOverVisible] = useState(false)
  const [isGameWinVisible, setIsGameWinVisible] = useState(false)
  const [isGameActive, setIsGameActive] = useState(false)

  // Стейты скора игры
  const [time, setTime] = useState(0)
  const [steps, setSteps] = useState(0)
  const [score, setScore] = useState(0)

  // Стейты игрока, врагов и кристаллов
  const [playerPosition, setPlayerPosition] = useState(
    level.player.startPosition
  )
  const [gems, setGems] = useState<{ x: number; y: number }[]>(
    level.gems.startPositions
  )

  const [enemies, setEnemies] = useState<{ x: number; y: number }[]>(
    level.enemy.startPositions.hard
  )

  // Пре-прогружаем картинки - иначе RAF не отрабатывает
  const { imagesLoaded, images } = useLoadImages()
  const { drawObstacles, drawGems, drawPlayer, drawEnemies } =
    useCanvasElements(images, level)

  // Хэндлеры модалок
  const resetPositions = () => {
    setIsStartModalVisible(false)
    setIsGameWinVisible(false)
    setIsGameOverVisible(false)
    setPlayerPosition(level.player.startPosition)
    setSteps(1) // хак, чтоб не прогружалось пустое поле
    setTime(0)
    setGems(level.gems.startPositions)
    // setEnemies(Constants.enemy.startPositions.easy)
    setIsGameActive(true)
    playGameSound()

    timerRef.current = setInterval(() => {
      setTime(prevSeconds => prevSeconds + 1)
      setScore(prevScore => prevScore - 1)
    }, 1000)
  }
  // Хэндлеры модалок
  const handleStartModalButton = (
    selectedLevel: string,
    selectedDifficulty: string
  ) => {
    resetPositions()

    const levelConfig = Constants[selectedLevel]
    setLevel(levelConfig)
    console.log('!!!levelConfig', levelConfig)
    console.log('!!!selectedDifficulty', selectedDifficulty)
    setPlayerPosition(levelConfig.player.startPosition)
    setGems(levelConfig.gems.startPositions)
    switch (selectedDifficulty) {
      case 'easy':
        setEnemies(levelConfig.enemy.startPositions.easy)
        break
      case 'moderate':
        setEnemies(levelConfig.enemy.startPositions.moderate)
        break
      case 'hard':
        setEnemies(levelConfig.enemy.startPositions.hard)

        break
    }
  }

  const handleVictory = () => {
    setIsGameWinVisible(true)
    setIsGameActive(false)
    stopGameSound()
    playVictorySound()
    if (timerRef.current) {
      clearInterval(timerRef.current)
    }
  }

  const handleDefeat = () => {
    setIsGameOverVisible(true)
    setIsGameActive(false)
    stopGameSound()
    playDefeatSound()
    if (timerRef.current) {
      clearInterval(timerRef.current)
    }
  }

  // Хэндлер позиций игрока и врагов
  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      event.preventDefault()
      if (!isGameActive) return
      const validKeys = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight']
      if (!validKeys.includes(event.key)) return
      setPlayerPosition(prev => {
        let { x, y } = prev
        const step = level.player.step

        switch (event.key) {
          case 'ArrowUp':
            y -= step
            break
          case 'ArrowDown':
            y += step
            break
          case 'ArrowLeft':
            x -= step
            break
          case 'ArrowRight':
            x += step
            break
        }

        const isCollidingWithEnemies = enemies.some(
          enemy =>
            x < enemy.x + level.enemy.width &&
            x + level.player.width > enemy.x &&
            y < enemy.y + level.enemy.height &&
            y + level.player.height > enemy.y
        )

        if (isCollidingWithEnemies) {
          handleDefeat()
        }

        const isCollidingWithObstaclesOrWalls =
          obstacles.some(
            obstacle =>
              x < obstacle.x + level.obstacles.width &&
              x + level.player.width > obstacle.x &&
              y < obstacle.y + level.obstacles.height &&
              y + level.player.height > obstacle.y
          ) ||
          x < 0 ||
          x + level.player.width > canvasSize.width ||
          y < 0 ||
          y + level.player.height > canvasSize.height

        if (isCollidingWithObstaclesOrWalls) {
          return prev
        }

        const newGems = gems.filter(
          gem =>
            !(
              x < gem.x + level.gems.width &&
              x + level.player.width > gem.x &&
              y < gem.y + level.gems.height &&
              y + level.player.height > gem.y
            )
        )

        if (newGems.length !== gems.length) {
          playGemSound()
          setScore(prevScore => prevScore + 100)
        }

        setGems(newGems)

        if (newGems.length === 0) {
          handleVictory()
        }

        setSteps(steps + 1)

        return { x, y }
      })

      setEnemies(prev =>
        prev.map(enemy => {
          let { x: enemyX, y: enemyY } = enemy
          const step = level.enemy.step
          const directions = ['up', 'down', 'left', 'right']
          const randomDirection =
            directions[Math.floor(Math.random() * directions.length)]

          switch (randomDirection) {
            case 'up':
              enemyY -= step
              break
            case 'down':
              enemyY += step
              break
            case 'left':
              enemyX -= step
              break
            case 'right':
              enemyX += step
              break
          }

          const isCollidingWithWalls =
            enemyX < 0 ||
            enemyX + level.enemy.width > canvasSize.width ||
            enemyY < 0 ||
            enemyY + level.enemy.height > canvasSize.height

          const isCollidingWithGems = gems.some(
            gem =>
              enemyX < gem.x + level.gems.width &&
              enemyX + level.enemy.width > gem.x &&
              enemyY < gem.y + level.gems.height &&
              enemyY + level.enemy.height > gem.y
          )

          const isCollidingWithObstacles = obstacles.some(
            obstacle =>
              enemyX < obstacle.x + level.obstacles.width &&
              enemyX + level.enemy.width > obstacle.x &&
              enemyY < obstacle.y + level.obstacles.height &&
              enemyY + level.enemy.height > obstacle.y
          )

          const isCollidingWithPlayer =
            playerPosition.x < enemyX + level.enemy.width &&
            playerPosition.x + level.player.width > enemyX &&
            playerPosition.y < enemyY + level.enemy.height &&
            playerPosition.y + level.player.height > enemyY

          if (
            isCollidingWithWalls ||
            isCollidingWithObstacles ||
            isCollidingWithGems
          ) {
            return enemy
          }

          if (isCollidingWithPlayer) {
            handleDefeat()
          }

          return { x: enemyX, y: enemyY }
        })
      )
    },
    [steps]
  )

  // Основной луп игры
  useEffect(() => {
    const canvas = canvasRef.current
    const context = canvas?.getContext('2d')

    const draw = () => {
      if (context) {
        context.clearRect(0, 0, canvasSize.width, canvasSize.height)
        drawObstacles(context, obstacles)
        drawGems(context, gems)
        drawPlayer(context, playerPosition)
        drawEnemies(context, enemies)
        window.requestAnimationFrame(draw)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    window.requestAnimationFrame(draw)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [
    handleKeyDown,
    drawObstacles,
    drawGems,
    drawPlayer,
    drawEnemies,
    obstacles,
    gems,
    playerPosition,
    enemies,
    canvasSize,
  ])

  return (
    <Layout>
      <div className={classNames(styles.game, 'page')}>
        <Header />
        {/* Игра */}
        <div className={styles.canvas}>
          <div className={styles.canvas__score}>
            <div>Steps: {steps}</div>
            <div>Time: {time}</div>
            <div>Score: {score}</div>
          </div>
          <canvas
            ref={canvasRef}
            width={canvasSize.width}
            height={canvasSize.height}
          />
        </div>

        {/* Модалка старта */}
        <StartModal
          visible={isStartModalVisible}
          onYesClick={handleStartModalButton}
        />

        {/* Модалка победы */}
        <WinModal
          visible={isGameWinVisible}
          onYesClick={resetPositions}
          score={score}
        />

        {/* Модалка фиаско */}
        <GameOverModal
          visible={isGameOverVisible}
          onYesClick={resetPositions}
          score={score}
        />
      </div>
      <Footer />
    </Layout>
  )
}

export default Game
