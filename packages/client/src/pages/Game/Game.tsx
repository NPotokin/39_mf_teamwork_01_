import { useRef, useEffect, useState, useCallback, useMemo } from 'react'
import { Layout } from 'antd'
import classNames from 'classnames'

import { Constants } from './constants'
import pandaStart from '@images/panda_start.svg'
import pandaWin from '@images/panda_win.svg'
import pandaLost from '@images/panda_over.svg'
import pumpkin from '@images/pumpkin.png'
import tiger from '@images/tiger.png'
import rock from '@images/rock.png'
import { GameModal, Header, Footer } from '@/components'
import styles from './Game.module.scss'

import useSound from '@/lib/hooks/useSound'

const Game: React.FC = () => {
  // Канвас и препятствия
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const timerRef = useRef<NodeJS.Timeout | null>(null)
  const obstacles = useMemo(() => Constants.obstacles.startPositions, [])
  const canvasSize = useMemo(
    () => ({
      width: Constants.canvas.width,
      height: Constants.canvas.height,
    }),
    []
  )

  // Музыкальное сопровождение
  const { playSound: playDefeatSound } = useSound('sounds/defeat.ogg')
  const { playSound: playVictorySound } = useSound('sounds/victory.ogg')
  const { playSound: playGemSound } = useSound('sounds/gem.ogg')
  const { playSound: playGameSound, stopSound: stopGameSound } = useSound(
    'sounds/game.ogg',
    0.2,
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

  // Стейты игрока, врагов и кристаллов
  const [playerPosition, setPlayerPosition] = useState(
    Constants.player.startPosition
  )
  const [gems, setGems] = useState<{ x: number; y: number }[]>(
    Constants.gems.startPositions
  )
  const [enemies, setEnemies] = useState<{ x: number; y: number }[]>(
    Constants.enemy.startPositions.easy
  )

  // Пре-прогружаем картинки - иначе RAF не отрабатывает
  const [imagesLoaded, setImagesLoaded] = useState(false)
  const [images, setImages] = useState({
    rock: new Image(),
    pumpkin: new Image(),
    pandaWin: new Image(),
    tiger: new Image(),
  })

  useEffect(() => {
    const rockImg = new Image()
    const pumpkinImg = new Image()
    const pandaWinImg = new Image()
    const tigerImg = new Image()

    let loaded = 0
    const total = 4

    const onLoad = () => {
      loaded += 1
      if (loaded === total) {
        setImagesLoaded(true)
      }
    }

    rockImg.src = rock
    pumpkinImg.src = pumpkin
    pandaWinImg.src = pandaWin
    tigerImg.src = tiger

    rockImg.onload = onLoad
    pumpkinImg.onload = onLoad
    pandaWinImg.onload = onLoad
    tigerImg.onload = onLoad

    setImages({
      rock: rockImg,
      pumpkin: pumpkinImg,
      pandaWin: pandaWinImg,
      tiger: tigerImg,
    })
  }, [])

  // Отрисовываем
  const drawObstacles = useCallback(
    (ctx: CanvasRenderingContext2D) => {
      obstacles.forEach(obstacle => {
        ctx.drawImage(
          images.rock,
          obstacle.x,
          obstacle.y,
          Constants.obstacles.width,
          Constants.obstacles.height
        )
      })
    },
    [obstacles, images.rock]
  )

  const drawGems = useCallback(
    (ctx: CanvasRenderingContext2D) => {
      gems.forEach(gem => {
        ctx.drawImage(
          images.pumpkin,
          gem.x,
          gem.y,
          Constants.gems.width,
          Constants.gems.height
        )
      })
    },
    [gems, images.pumpkin]
  )

  const drawPlayer = useCallback(
    (ctx: CanvasRenderingContext2D) => {
      ctx.drawImage(
        images.pandaWin,
        playerPosition.x,
        playerPosition.y,
        Constants.player.width,
        Constants.player.height
      )
    },
    [playerPosition, images.pandaWin]
  )

  const drawEnemies = useCallback(
    (ctx: CanvasRenderingContext2D) => {
      enemies.forEach(enemy => {
        ctx.drawImage(
          images.tiger,
          enemy.x,
          enemy.y,
          Constants.enemy.width,
          Constants.enemy.height
        )
      })
    },
    [enemies, images.tiger]
  )

  // Хэндлеры модалок
  const handleStartModalButton = () => {
    setIsStartModalVisible(false)
    setIsGameWinVisible(false)
    setIsGameOverVisible(false)
    setPlayerPosition(Constants.player.startPosition)
    setSteps(1) // хак, чтоб не прогружалось пустое поле
    setTime(0)
    setGems(Constants.gems.startPositions)
    // setEnemies(Constants.enemy.startPositions.easy)
    setIsGameActive(true)
    playGameSound()

    timerRef.current = setInterval(() => {
      setTime(prevSeconds => prevSeconds + 1)
    }, 1000)
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

  const handleEasyModeOn = () => {
    setEnemies(Constants.enemy.startPositions.easy)
  }
  const handleModerateModeOn = () => {
    setEnemies(Constants.enemy.startPositions.moderate)
  }
  const handleHardModeOn = () => {
    setEnemies(Constants.enemy.startPositions.hard)
  }

  // Хэндлер позиций игрока и врагов
  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (!isGameActive) return
      const validKeys = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight']
      if (!validKeys.includes(event.key)) return
      setPlayerPosition(prev => {
        let { x, y } = prev
        const step = Constants.player.step

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
            x < enemy.x + Constants.enemy.width &&
            x + Constants.player.width > enemy.x &&
            y < enemy.y + Constants.enemy.height &&
            y + Constants.player.height > enemy.y
        )

        if (isCollidingWithEnemies) {
          handleDefeat()
        }

        const isCollidingWithObstaclesOrWalls =
          obstacles.some(
            obstacle =>
              x < obstacle.x + Constants.obstacles.width &&
              x + Constants.player.width > obstacle.x &&
              y < obstacle.y + Constants.obstacles.height &&
              y + Constants.player.height > obstacle.y
          ) ||
          x < 0 ||
          x + Constants.player.width > canvasSize.width ||
          y < 0 ||
          y + Constants.player.height > canvasSize.height

        if (isCollidingWithObstaclesOrWalls) {
          return prev
        }

        const newGems = gems.filter(
          gem =>
            !(
              x < gem.x + Constants.gems.width &&
              x + Constants.player.width > gem.x &&
              y < gem.y + Constants.gems.height &&
              y + Constants.player.height > gem.y
            )
        )

        if (newGems.length !== gems.length) {
          playGemSound()
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
          const step = Constants.enemy.step
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
            enemyX + Constants.enemy.width > canvasSize.width ||
            enemyY < 0 ||
            enemyY + Constants.enemy.height > canvasSize.height

          const isCollidingWithGems = gems.some(
            gem =>
              enemyX < gem.x + Constants.gems.width &&
              enemyX + Constants.enemy.width > gem.x &&
              enemyY < gem.y + Constants.gems.height &&
              enemyY + Constants.enemy.height > gem.y
          )

          const isCollidingWithObstacles = obstacles.some(
            obstacle =>
              enemyX < obstacle.x + Constants.obstacles.width &&
              enemyX + Constants.enemy.width > obstacle.x &&
              enemyY < obstacle.y + Constants.obstacles.height &&
              enemyY + Constants.enemy.height > obstacle.y
          )

          const isCollidingWithPlayer =
            playerPosition.x < enemyX + Constants.enemy.width &&
            playerPosition.x + Constants.player.width > enemyX &&
            playerPosition.y < enemyY + Constants.enemy.height &&
            playerPosition.y + Constants.player.height > enemyY

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
        drawObstacles(context)
        drawGems(context)
        drawPlayer(context)
        drawEnemies(context)
        window.requestAnimationFrame(draw)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    window.requestAnimationFrame(draw)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [handleKeyDown])

  return (
    <Layout>
      <div className={classNames(styles.game, 'page')}>
        <Header />
        {/* Игра */}
        <div className={styles.canvas}>
          <div>Steps: {steps}</div>
          <div>Time: {time}</div>
          <div className="button">
            <button onClick={handleEasyModeOn}>Easy</button>
            <button onClick={handleModerateModeOn}>Moderate</button>
            <button onClick={handleHardModeOn}>Hard</button>
          </div>
          <canvas
            ref={canvasRef}
            width={canvasSize.width}
            height={canvasSize.height}
          />
        </div>

        {/* Модалка старта */}
        <GameModal
          visible={isStartModalVisible}
          imageSrc={pandaStart}
          title={'Start the game'}
          subtitle={'Are you ready?'}
          onYesClick={handleStartModalButton}
        />

        {/* Модалка победы */}
        <GameModal
          visible={isGameWinVisible}
          imageSrc={pandaWin}
          titleClass={'nes-text is-success'}
          title={'You Win!'}
          subtitle={'Play again?'}
          onYesClick={handleStartModalButton}
        />

        {/* Модалка фиаско */}
        <GameModal
          visible={isGameOverVisible}
          imageSrc={pandaLost}
          titleClass={'nes-text is-warning'}
          title={'Game Over'}
          subtitle={'Play again?'}
          onYesClick={handleStartModalButton}
        />
      </div>
      <Footer />
    </Layout>
  )
}

export default Game
