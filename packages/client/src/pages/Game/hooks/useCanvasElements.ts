import { useCallback } from 'react'
import { ILevel } from '../constants'

type Props = {
  images: {
    rock: HTMLImageElement
    pumpkin: HTMLImageElement
    pandaWin: HTMLImageElement
    tiger: HTMLImageElement
  }
  level: ILevel
}

export interface Position {
  x: number
  y: number
}

export const useCanvasElements = ({
  images,
  level,
}: Props) => {
  const drawObstacles = useCallback(
    (
      ctx: CanvasRenderingContext2D,
      obstacles: Position[]
    ) => {
      obstacles.forEach(obstacle => {
        ctx.drawImage(
          images.rock,
          obstacle.x,
          obstacle.y,
          level.obstacles.width,
          level.obstacles.height
        )
      })
    },
    [
      images.rock,
      level.obstacles.width,
      level.obstacles.height,
    ]
  )
  const drawGems = useCallback(
    (
      ctx: CanvasRenderingContext2D,
      gems: Position[]
    ) => {
      gems.forEach(gem => {
        ctx.drawImage(
          images.pumpkin,
          gem.x,
          gem.y,
          level.gems.width,
          level.gems.height
        )
      })
    },
    [
      images.pumpkin,
      level.gems.width,
      level.gems.height,
    ]
  )
  const drawPlayer = useCallback(
    (
      ctx: CanvasRenderingContext2D,
      playerPosition: Position
    ) => {
      ctx.drawImage(
        images.pandaWin,
        playerPosition.x,
        playerPosition.y,
        level.player.width,
        level.player.height
      )
    },
    [
      images.pandaWin,
      level.player.width,
      level.player.height,
    ]
  )
  const drawEnemies = useCallback(
    (
      ctx: CanvasRenderingContext2D,
      enemies: Position[]
    ) => {
      enemies.forEach(enemy => {
        ctx.drawImage(
          images.tiger,
          enemy.x,
          enemy.y,
          level.enemy.width,
          level.enemy.height
        )
      })
    },
    [
      images.tiger,
      level.enemy.width,
      level.enemy.height,
    ]
  )
  return {
    drawObstacles,
    drawGems,
    drawPlayer,
    drawEnemies,
  }
}
