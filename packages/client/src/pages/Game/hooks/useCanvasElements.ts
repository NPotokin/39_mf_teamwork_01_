import { useCallback } from 'react'

export const useCanvasElements = (images, level) => {
  const drawObstacles = useCallback(
    (ctx: CanvasRenderingContext2D, obstacles) => {
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
    [images.rock, level.obstacles.width, level.obstacles.height]
  )
  const drawGems = useCallback(
    (ctx: CanvasRenderingContext2D, gems) => {
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
    [images.pumpkin, level.gems.width, level.gems.height]
  )
  const drawPlayer = useCallback(
    (ctx: CanvasRenderingContext2D, playerPosition) => {
      ctx.drawImage(
        images.pandaWin,
        playerPosition.x,
        playerPosition.y,
        level.player.width,
        level.player.height
      )
    },
    [images.pandaWin, level.player.width, level.player.height]
  )
  const drawEnemies = useCallback(
    (ctx: CanvasRenderingContext2D, enemies) => {
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
    [images.tiger, level.enemy.width, level.enemy.height]
  )
  return { drawObstacles, drawGems, drawPlayer, drawEnemies }
}
