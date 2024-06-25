import React, { useRef, useEffect, useState, useCallback, useMemo } from 'react'
import styles from './Game.module.scss'
import { Positions } from './positions'
import pandaStart from '@images/panda_start.svg'
import pandaWin from '@images/panda_win.svg'
import pandaLost from '@images/panda_over.svg'
import { GameModal } from '@/components'

const Game: React.FC = () => {
  // Канвас и препятствия
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const timerRef = useRef<NodeJS.Timeout | null>(null)
  const obstacles = useMemo(() => Positions.obsticles, [])
  const canvasSize = useMemo(() => ({ width: 800, height: 600 }), [])

  // Стейты модалок
  const [isStartModalVisible, setIsStartModalVisible] = useState(true)
  const [isGameOverVisible, setIsGameOverVisible] = useState(false)
  const [isGameWinVisible, setIsGameWinVisible] = useState(false)

  // Стейты скора игры
  const [time, setTime] = useState(0)
  const [steps, setSteps] = useState(0)

  // Стейты игрока, врагов и кристаллов
  const [playerPosition, setPlayerPosition] = useState({ x: 0, y: 0 })
  const [gems, setGems] = useState<{ x: number; y: number }[]>(Positions.gems)
  const [enemies, setEnemies] = useState<{ x: number; y: number }[]>(
    Positions.enemies
  )

  // Отрисовка
  const drawObstacles = useCallback(
    (ctx: CanvasRenderingContext2D) => {
      ctx.fillStyle = 'gray'
      obstacles.forEach(obstacle => {
        ctx.fillRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height)
      })
    },
    [obstacles]
  )

  const drawGems = useCallback(
    (ctx: CanvasRenderingContext2D) => {
      ctx.fillStyle = 'yellow'
      gems.forEach(gem => {
        ctx.fillRect(gem.x, gem.y, 40, 40)
      })
    },
    [gems]
  )

  const drawPlayer = useCallback(
    (ctx: CanvasRenderingContext2D) => {
      ctx.fillStyle = 'blue'
      ctx.fillRect(playerPosition.x, playerPosition.y, 40, 40)
    },
    [playerPosition]
  )

  const drawEnemies = useCallback(
    (ctx: CanvasRenderingContext2D) => {
      ctx.fillStyle = 'red'
      enemies.forEach(enemy => {
        ctx.fillRect(enemy.x, enemy.y, 40, 40)
      })
    },
    [enemies]
  )

  // Хэндлеры модалок
  const handleStartModalButton = () => {
    setIsStartModalVisible(false)
    setIsGameWinVisible(false)
    setIsGameOverVisible(false)
    setPlayerPosition({ x: 0, y: 0 })
    setSteps(0)
    setTime(0)
    setGems(Positions.gems)
    setEnemies(Positions.enemies)
    setTime(0)
    setSteps(0)

    timerRef.current = setInterval(() => {
      setTime(prevSeconds => prevSeconds + 1)
    }, 1000)
  }

  const handleVictory = () => {
    setIsGameWinVisible(true)
    if (timerRef.current) {
      clearInterval(timerRef.current)
    }
  }

  const handleDefeat = () => {
    setIsGameOverVisible(true)
    if (timerRef.current) {
      clearInterval(timerRef.current)
    }
  }

  // Хэндлер позиций игрока и врагов
  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      setPlayerPosition(prev => {
        let { x, y } = prev
        const step = 20

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
            x < enemy.x + 40 &&
            x + 40 > enemy.x &&
            y < enemy.y + 40 &&
            y + 40 > enemy.y
        )

        if (isCollidingWithEnemies) {
          handleDefeat()
          console.log('player collided', playerPosition, enemies)
        }

        const isCollidingWithObstaclesOrWalls =
          obstacles.some(
            obstacle =>
              x < obstacle.x + obstacle.width &&
              x + 40 > obstacle.x &&
              y < obstacle.y + obstacle.height &&
              y + 40 > obstacle.y
          ) ||
          x < 0 ||
          x + 40 > canvasSize.width ||
          y < 0 ||
          y + 40 > canvasSize.height

        if (isCollidingWithObstaclesOrWalls) {
          return prev
        }

        const newGems = gems.filter(
          gem =>
            !(
              x < gem.x + 40 &&
              x + 40 > gem.x &&
              y < gem.y + 40 &&
              y + 40 > gem.y
            )
        )
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
          const step = 40
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
            enemyX + 40 > canvasSize.width ||
            enemyY < 0 ||
            enemyY + 40 > canvasSize.height

          const isCollidingWithGems = gems.some(
            gem =>
              enemyX < gem.x + 40 &&
              enemyX + 40 > gem.x &&
              enemyY < gem.y + 40 &&
              enemyY + 40 > gem.y
          )

          const isCollidingWithObstacles = obstacles.some(
            obstacle =>
              enemyX < obstacle.x + obstacle.width &&
              enemyX + 40 > obstacle.x &&
              enemyY < obstacle.y + obstacle.height &&
              enemyY + 40 > obstacle.y
          )

          // Check collision with player
          const isCollidingWithPlayer =
            playerPosition.x < enemyX + 40 &&
            playerPosition.x + 40 > enemyX &&
            playerPosition.y < enemyY + 40 &&
            playerPosition.y + 40 > enemyY

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
    [
      canvasSize.height,
      canvasSize.width,
      obstacles,
      gems,
      enemies,
      playerPosition,
      steps,
    ]
  )

  // Основной луп игры
  useEffect(() => {
    const canvas = canvasRef.current
    const context = canvas?.getContext('2d')

    const draw = () => {
      context?.clearRect(0, 0, canvasSize.width, canvasSize.height)
      drawObstacles(context!)
      drawGems(context!)
      drawPlayer(context!)
      drawEnemies(context!)
    }

    window.addEventListener('keydown', handleKeyDown)
    draw()

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [
    canvasSize.width,
    canvasSize.height,
    drawObstacles,
    drawGems,
    drawPlayer,
    drawEnemies,
    handleKeyDown,
  ])

  return (
    <div className={styles.game}>
      {/* Игра */}
      <div className={styles.canvas}>
        <div>Steps: {steps}</div>
        <div>Time: {time}</div>
        <canvas
          ref={canvasRef}
          width={canvasSize.width}
          height={canvasSize.height}
        />
      </div>

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
