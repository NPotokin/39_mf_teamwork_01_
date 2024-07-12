import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import useLoadImages from './useLoadImages'
import { useCanvasElements } from './useCanvasElements'
import { ILevel } from '../constants'

type Modals = {
  isStartModalVisible: boolean
  isGameOverVisible: boolean
  isGameWinVisible: boolean
  isGameActive: boolean
  showStartModal: VoidFunction
  hideStartModal: VoidFunction
  showGameOverModal: VoidFunction
  hideGameOverModal: VoidFunction
  showGameWinModal: VoidFunction
  hideGameWinModal: VoidFunction
  setIsGameActive: (arg0: boolean) => void
}

type Sound = {
  playDefeatSound: VoidFunction
  playVictorySound: VoidFunction
  playGemSound: VoidFunction
  playGameSound: VoidFunction
  stopGameSound: VoidFunction
}
type Props = {
  level: ILevel
  sounds: Sound
  modals: Modals
}
const useGameLogic = ({
  level,
  sounds,
  modals,
}: Props) => {
  // Стейты игрока, врагов и кристаллов
  const [playerPosition, setPlayerPosition] =
    useState(level.player.startPosition)
  const [gems, setGems] = useState<
    { x: number; y: number }[]
  >(level.gems.startPositions)

  const [enemies, setEnemies] = useState<
    { x: number; y: number }[]
  >(level.enemy.startPositions.hard)
  // Стейты скора игры
  const [time, setTime] = useState(0)
  const [steps, setSteps] = useState(0)
  const [score, setScore] = useState(0)

  const canvasRef =
    useRef<HTMLCanvasElement | null>(null)
  const timerRef = useRef<NodeJS.Timeout | null>(
    null
  )

  const obstacles = level.obstacles.startPositions
  const canvasSize = useMemo(
    () => ({
      width: level.canvas.width,
      height: level.canvas.height,
    }),
    []
  )

  const { imagesLoaded, images } = useLoadImages()
  const {
    drawObstacles,
    drawGems,
    drawPlayer,
    drawEnemies,
  } = useCanvasElements({ images, level })

  const resetPositions = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current)
    }
    modals.hideStartModal()
    modals.hideGameWinModal()
    modals.hideGameOverModal()
    setPlayerPosition(level.player.startPosition)
    setSteps(1) // хак, чтоб не прогружалось пустое поле
    setTime(0)
    setScore(0)
    setGems(level.gems.startPositions)
    // setEnemies(Constants.enemy.startPositions.easy)
    modals.setIsGameActive(true)
    sounds.playGameSound()

    timerRef.current = setInterval(() => {
      setTime(prevSeconds => prevSeconds + 1)
      setScore(prevScore => prevScore - 1)
    }, 1000)
  }, [level, modals, sounds])

  //очищаем интервал при размонтировании компонента
  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current)
      }
    }
  }, [])

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      event.preventDefault()
      if (!modals.isGameActive) return
      const validKeys = [
        'ArrowUp',
        'ArrowDown',
        'ArrowLeft',
        'ArrowRight',
      ]
      if (!validKeys.includes(event.key)) return

      let newX = playerPosition.x
      let newY = playerPosition.y
      const step = level.player.step

      switch (event.key) {
        case 'ArrowUp':
          newY -= step
          break
        case 'ArrowDown':
          newY += step
          break
        case 'ArrowLeft':
          newX -= step
          break
        case 'ArrowRight':
          newX += step
          break
      }

      const isCollidingWithEnemies = enemies.some(
        enemy =>
          newX < enemy.x + level.enemy.width &&
          newX + level.player.width > enemy.x &&
          newY < enemy.y + level.enemy.height &&
          newY + level.player.height > enemy.y
      )

      if (isCollidingWithEnemies) {
        handleDefeat()
      }

      const isCollidingWithObstaclesOrWalls =
        obstacles.some(
          obstacle =>
            newX <
              obstacle.x +
                level.obstacles.width &&
            newX + level.player.width >
              obstacle.x &&
            newY <
              obstacle.y +
                level.obstacles.height &&
            newY + level.player.height >
              obstacle.y
        ) ||
        newX < 0 ||
        newX + level.player.width >
          canvasSize.width ||
        newY < 0 ||
        newY + level.player.height >
          canvasSize.height

      if (isCollidingWithObstaclesOrWalls) {
        return
      }

      const newGems = gems.filter(
        gem =>
          !(
            newX < gem.x + level.gems.width &&
            newX + level.player.width > gem.x &&
            newY < gem.y + level.gems.height &&
            newY + level.player.height > gem.y
          )
      )

      if (newGems.length !== gems.length) {
        sounds.playGemSound()
        setScore(prevScore => prevScore + 100)
      }

      setGems(newGems)

      if (newGems.length === 0) {
        handleVictory()
        return
      }

      setPlayerPosition({ x: newX, y: newY })

      const updatedEnemies = enemies.map(
        enemy => {
          let enemyX = enemy.x
          let enemyY = enemy.y
          const directions = [
            'up',
            'down',
            'left',
            'right',
          ]
          const randomDirection =
            directions[
              Math.floor(
                Math.random() * directions.length
              )
            ]

          switch (randomDirection) {
            case 'up':
              enemyY -= level.enemy.step
              break
            case 'down':
              enemyY += level.enemy.step
              break
            case 'left':
              enemyX -= level.enemy.step
              break
            case 'right':
              enemyX += level.enemy.step
              break
          }

          const isCollidingWithWalls =
            enemyX < 0 ||
            enemyX + level.enemy.width >
              canvasSize.width ||
            enemyY < 0 ||
            enemyY + level.enemy.height >
              canvasSize.height

          const isCollidingWithGems =
            newGems.some(
              gem =>
                enemyX <
                  gem.x + level.gems.width &&
                enemyX + level.enemy.width >
                  gem.x &&
                enemyY <
                  gem.y + level.gems.height &&
                enemyY + level.enemy.height >
                  gem.y
            )

          const isCollidingWithObstacles =
            obstacles.some(
              obstacle =>
                enemyX <
                  obstacle.x +
                    level.obstacles.width &&
                enemyX + level.enemy.width >
                  obstacle.x &&
                enemyY <
                  obstacle.y +
                    level.obstacles.height &&
                enemyY + level.enemy.height >
                  obstacle.y
            )

          const isCollidingWithPlayer =
            newX < enemyX + level.enemy.width &&
            newX + level.player.width > enemyX &&
            newY < enemyY + level.enemy.height &&
            newY + level.player.height > enemyY

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
        }
      )

      setEnemies(updatedEnemies)
    },
    [
      steps,
      level,
      playerPosition,
      gems,
      enemies,
      canvasSize,
      obstacles,
      modals,
      sounds,
    ]
  )

  const handleVictory = useCallback(() => {
    modals.showGameWinModal()

    // setIsGameWinVisible(true)
    modals.setIsGameActive(false)
    sounds.stopGameSound()
    sounds.playVictorySound()
    if (timerRef.current) {
      clearInterval(timerRef.current)
    }
  }, [modals, sounds])

  const handleDefeat = useCallback(() => {
    modals.showGameOverModal()
    modals.setIsGameActive(false)
    sounds.stopGameSound()
    sounds.playDefeatSound()
    if (timerRef.current) {
      clearInterval(timerRef.current)
    }
  }, [modals, sounds])

  useEffect(() => {
    const canvas = canvasRef.current
    const context = canvas?.getContext('2d')

    const draw = () => {
      if (context) {
        context.clearRect(
          0,
          0,
          canvasSize.width,
          canvasSize.height
        )
        drawObstacles(context, obstacles)
        drawGems(context, gems)
        drawPlayer(context, playerPosition)
        drawEnemies(context, enemies)
        window.requestAnimationFrame(draw)
      }
    }

    window.addEventListener(
      'keydown',
      handleKeyDown
    )
    window.requestAnimationFrame(draw)

    return () => {
      window.removeEventListener(
        'keydown',
        handleKeyDown
      )
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

  return {
    canvasRef,
    time,
    steps,
    score,
    playerPosition,
    gems,
    enemies,
    resetPositions,
    handleVictory,
    handleDefeat,
    setPlayerPosition,
    setGems,
    setEnemies,
    canvasSize,
  }
}
export default useGameLogic
