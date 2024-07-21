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

export type Modals = {
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

export type Sound = {
  playDefeatSound: VoidFunction
  playVictorySound: VoidFunction
  playGemSound: VoidFunction
  playGameSound: VoidFunction
  stopGameSound: VoidFunction
}
export type GameLogicProps = {
  level: ILevel
  sounds: Sound
  modals: Modals
}

const useGameLogic = ({
  level,
  sounds,
  modals,
}: GameLogicProps) => {
  // Стейт для позиции главного героя
  const [direction, setDirection] = useState<
    'left' | 'right'
  >('right')
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
  const [playerFrame, setPlayerFrame] =
    useState(0)
  const [enemyFrame, setEnemyFrame] = useState(0)
  const [pumpkinFrame, setPumpkinFrame] =
    useState(0)

  const canvasRef =
    useRef<HTMLCanvasElement | null>(null)
  const timerRef = useRef<NodeJS.Timeout | null>(
    null
  )
  const animationRef = useRef<number | null>(null)
  const playerAnimationRef = useRef<
    number | null
  >(null)
  const enemyAnimationRef = useRef<number | null>(
    null
  )
  const pumpkinAnimationRef = useRef<
    number | null
  >(null)
  const lastPlayerUpdateTimeRef =
    useRef<number>(0)
  const lastEnemyUpdateTimeRef = useRef<number>(0)
  const lastPumpkinUpdateTimeRef =
    useRef<number>(0)
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
  const PLAYER_ANIMATION_FRAMES = {
    right: images.pandaFrames,
    left: images.pandaFramesLeft,
  }
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
    // sounds.playGameSound()

    timerRef.current = setInterval(() => {
      setTime(prevSeconds => prevSeconds + 1)
      setScore(prevScore => prevScore - 1)
    }, 1000)
  }, [level, modals, sounds])

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current)
      }
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
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
          setDirection('left')
          break
        case 'ArrowRight':
          newX += step
          setDirection('right')
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
        return
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
      setSteps(step => step + 1)

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

  const updatePlayerAnimation = useCallback(
    (timestamp: number) => {
      if (lastPlayerUpdateTimeRef.current === 0) {
        lastPlayerUpdateTimeRef.current =
          timestamp
      }

      const deltaTime = Math.max(
        timestamp -
          lastPlayerUpdateTimeRef.current,
        0
      )
      lastPlayerUpdateTimeRef.current = timestamp

      if (deltaTime > 16.67) {
        // Обновляем каждые ~16.67 (1000/60) мс для 60 FPS
        const currentFrames =
          PLAYER_ANIMATION_FRAMES[direction] ||
          PLAYER_ANIMATION_FRAMES.right
        setPlayerFrame(
          prevFrame =>
            (prevFrame + 1) % currentFrames.length
        )
      }

      playerAnimationRef.current =
        requestAnimationFrame(
          updatePlayerAnimation
        )
    },
    [images.pandaFrames.length]
  )

  const updateEnemyAnimation = useCallback(
    (timestamp: number) => {
      if (lastEnemyUpdateTimeRef.current === 0) {
        lastEnemyUpdateTimeRef.current = timestamp
      }

      const deltaTime = Math.max(
        timestamp -
          lastEnemyUpdateTimeRef.current,
        0
      )
      lastEnemyUpdateTimeRef.current = timestamp
      console.log('!!!deltaTime', deltaTime)
      if (deltaTime > 16.67) {
        setEnemyFrame(
          prevFrame =>
            (prevFrame + 1) %
            images.foxFrames.length
        )
      }

      enemyAnimationRef.current =
        requestAnimationFrame(
          updateEnemyAnimation
        )
    },
    [images.foxFrames.length]
  )

  const updatePumpkinAnimation = useCallback(
    (timestamp: number) => {
      if (
        lastPumpkinUpdateTimeRef.current === 0
      ) {
        lastPumpkinUpdateTimeRef.current =
          timestamp
      }

      const deltaTime = Math.max(
        timestamp -
          lastPumpkinUpdateTimeRef.current,
        0
      )
      lastPumpkinUpdateTimeRef.current = timestamp

      if (deltaTime > 40) {
        setPumpkinFrame(
          prevFrame =>
            (prevFrame + 1) %
            images.pumpkinFrames.length
        )
      }

      pumpkinAnimationRef.current =
        requestAnimationFrame(
          updatePumpkinAnimation
        )
    },
    [images.pumpkinFrames.length]
  )
  // Запускаем анимацию при загрузке и очищаем при размонтировании
  useEffect(() => {
    if (imagesLoaded) {
      playerAnimationRef.current =
        requestAnimationFrame(
          updatePlayerAnimation
        )
      enemyAnimationRef.current =
        requestAnimationFrame(
          updateEnemyAnimation
        )
      pumpkinAnimationRef.current =
        requestAnimationFrame(
          updatePumpkinAnimation
        )
    }
    return () => {
      if (playerAnimationRef.current) {
        cancelAnimationFrame(
          playerAnimationRef.current
        )
        playerAnimationRef.current = null
      }
      if (enemyAnimationRef.current) {
        cancelAnimationFrame(
          enemyAnimationRef.current
        )
        enemyAnimationRef.current = null
      }
      if (pumpkinAnimationRef.current) {
        cancelAnimationFrame(
          pumpkinAnimationRef.current
        )
        pumpkinAnimationRef.current = null
      }
    }
  }, [
    imagesLoaded,
    updatePlayerAnimation,
    updateEnemyAnimation,
    updatePumpkinAnimation,
  ])

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
        drawGems(
          context,
          gems,
          images.pumpkinFrames[pumpkinFrame]
        )
        const playerFrames =
          PLAYER_ANIMATION_FRAMES[direction] ||
          PLAYER_ANIMATION_FRAMES.right
        drawPlayer(
          context,
          playerPosition,
          playerFrames[playerFrame]
        )
        drawEnemies(
          context,
          enemies,
          images.foxFrames[enemyFrame]
        )
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
    playerFrame,
    enemyFrame,
    canvasSize,
    images.pandaFrames,
    images.pandaFramesLeft,
    images.foxFrames,
    direction,
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

export type UseGameType = ReturnType<
  typeof useGameLogic
>
