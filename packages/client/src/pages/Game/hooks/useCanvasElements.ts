import { useCallback } from 'react'
import { ILevel } from '../constants'

type Props = {
  images: {
    rock: HTMLImageElement
    foxFrames: HTMLImageElement[]
    pandaFrames: HTMLImageElement[]
    pandaFramesLeft: HTMLImageElement[]
    pumpkinFrames: HTMLImageElement[]
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
      context: CanvasRenderingContext2D,
      obstacles: Position[]
    ) => {
      obstacles.forEach(obstacle => {
        if (
          images.rock instanceof HTMLImageElement
        ) {
          context.drawImage(
            images.rock,
            obstacle.x,
            obstacle.y,
            level.obstacles.width,
            level.obstacles.height
          )
        }
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
      context: CanvasRenderingContext2D,
      gems: Position[],
      frame: HTMLImageElement
    ) => {
      if (!(frame instanceof HTMLImageElement)) {
        return
      }
      gems.forEach(gem => {
        context.drawImage(
          frame,
          gem.x,
          gem.y,
          level.gems.width,
          level.gems.height
        )
      })
    },
    [level.gems.width, level.gems.height]
  )

  const drawPlayer = useCallback(
    (
      context: CanvasRenderingContext2D,
      playerPosition: Position,
      frame: HTMLImageElement
    ) => {
      if (!(frame instanceof HTMLImageElement)) {
        return
      }
      context.drawImage(
        frame,
        playerPosition.x,
        playerPosition.y,
        level.player.width,
        level.player.height
      )
    },
    [level.player.width, level.player.height]
  )
  const drawEnemies = useCallback(
    (
      context: CanvasRenderingContext2D,
      enemies: Position[],
      frame: HTMLImageElement
    ) => {
      if (!(frame instanceof HTMLImageElement)) {
        return
      }
      enemies.forEach(enemy => {
        context.drawImage(
          frame,
          enemy.x,
          enemy.y,
          level.enemy.width,
          level.enemy.height
        )
      })
    },
    [level.enemy.width, level.enemy.height]
  )
  return {
    drawObstacles,
    drawGems,
    drawPlayer,
    drawEnemies,
  }
}
