import { useCallback, useState } from 'react'
import { ILevel } from '../constants'

const usePlayerState = (level: ILevel) => {
  // Стейт для позиции главного героя
  const [direction, setDirection] = useState<
    'left' | 'right'
  >('right')
  // Стейты игрока, врагов и кристаллов
  const [playerPosition, setPlayerPosition] =
    useState(level.player.startPosition)

  const updatePlayerPosition = useCallback(
    (
      newX: number,
      newY: number,
      direction: 'left' | 'right'
    ) => {
      setPlayerPosition({ x: newX, y: newY })
      setDirection(direction)
    },
    []
  )
  return {
    playerPosition,
    direction,
    setPlayerPosition,
    updatePlayerPosition,
  }
}
export default usePlayerState
