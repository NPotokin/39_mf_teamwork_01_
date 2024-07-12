import { IConstants } from '../../constants'

export const mockLevelConstants: Omit<
  IConstants,
  'levelTwo' | 'levelThree'
> = {
  levelOne: {
    canvas: {
      width: 800,
      height: 600,
    },

    player: {
      width: 40,
      height: 40,
      step: 20,
      startPosition: {
        x: 0,
        y: 0,
      },
    },

    enemy: {
      width: 40,
      height: 40,
      step: 40,
      startPositions: {
        easy: [{ x: 620, y: 0 }],
        moderate: [{ x: 620, y: 0 }],
        hard: [{ x: 620, y: 0 }],
      },
    },

    gems: {
      width: 40,
      height: 40,
      startPositions: [
        { x: 20, y: 0 },
        { x: 680, y: 40 },
        { x: 520, y: 100 },
      ],
    },

    obstacles: {
      width: 40,
      height: 40,
      startPositions: [{ x: 160, y: 80 }],
    },
  },
}
