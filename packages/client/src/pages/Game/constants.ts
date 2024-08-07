import { Position } from './hooks/useCanvasElements'

export interface ILevel {
  canvas: {
    width: number
    height: number
  }
  player: {
    width: number
    height: number
    step: number
    startPosition: Position
  }
  enemy: {
    width: number
    height: number
    step: number
    startPositions: {
      easy: Position[]
      moderate: Position[]
      hard: Position[]
    }
  }
  gems: {
    width: number
    height: number
    startPositions: Position[]
  }
  obstacles: {
    width: number
    height: number
    startPositions: Position[]
  }
}

export interface IConstants {
  levelOne: ILevel
  levelTwo: ILevel
  levelThree: ILevel
}
export const Constants: IConstants = {
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
        easy: [
          { x: 120, y: 0 },
          { x: 440, y: 80 },
          { x: 160, y: 320 },
          { x: 40, y: 480 },
          { x: 360, y: 560 },
        ],
        moderate: [
          { x: 120, y: 0 },
          { x: 440, y: 80 },
          { x: 680, y: 200 },
          { x: 0, y: 360 },
          { x: 720, y: 340 },
          { x: 40, y: 480 },
          { x: 200, y: 480 },
          { x: 520, y: 480 },
        ],
        hard: [
          { x: 120, y: 0 },
          { x: 640, y: 40 },
          { x: 440, y: 80 },
          { x: 80, y: 200 },
          { x: 680, y: 200 },
          { x: 160, y: 320 },
          { x: 0, y: 360 },
          { x: 720, y: 340 },
          { x: 40, y: 480 },
          { x: 720, y: 440 },
          { x: 200, y: 480 },
          { x: 360, y: 560 },
          { x: 520, y: 480 },
        ],
      },
    },

    gems: {
      width: 40,
      height: 40,
      startPositions: [
        { x: 120, y: 40 },
        { x: 680, y: 40 },
        { x: 440, y: 120 },
        { x: 40, y: 200 },
        { x: 720, y: 200 },
        { x: 160, y: 280 },
        { x: 40, y: 360 },
        { x: 680, y: 340 },
        { x: 0, y: 480 },
        { x: 720, y: 480 },
        { x: 200, y: 520 },
        { x: 360, y: 520 },
        { x: 520, y: 520 },
      ],
    },

    obstacles: {
      width: 40,
      height: 40,
      startPositions: [
        { x: 160, y: 40 },
        { x: 200, y: 40 },
        { x: 240, y: 40 },
        { x: 280, y: 40 },
        { x: 320, y: 40 },
        { x: 400, y: 40 },
        { x: 440, y: 40 },
        { x: 480, y: 40 },
        { x: 520, y: 40 },
        { x: 560, y: 40 },

        { x: 0, y: 120 },
        { x: 80, y: 120 },
        { x: 120, y: 120 },
        { x: 160, y: 120 },
        { x: 200, y: 120 },
        { x: 280, y: 120 },
        { x: 320, y: 120 },
        { x: 360, y: 120 },

        { x: 520, y: 120 },
        { x: 560, y: 120 },
        { x: 600, y: 120 },
        { x: 640, y: 120 },
        { x: 680, y: 120 },
        { x: 720, y: 120 },

        { x: 120, y: 200 },

        { x: 200, y: 200 },
        { x: 240, y: 200 },
        { x: 280, y: 200 },

        { x: 360, y: 200 },
        { x: 400, y: 200 },
        { x: 440, y: 200 },
        { x: 480, y: 200 },
        { x: 560, y: 200 },
        { x: 600, y: 200 },
        { x: 640, y: 200 },

        { x: 0, y: 280 },
        { x: 40, y: 280 },
        { x: 80, y: 280 },

        { x: 240, y: 280 },
        { x: 280, y: 280 },
        { x: 320, y: 280 },
        { x: 360, y: 280 },
        { x: 400, y: 280 },
        { x: 440, y: 280 },

        { x: 520, y: 280 },
        { x: 560, y: 280 },
        { x: 600, y: 280 },
        { x: 640, y: 280 },
        { x: 680, y: 280 },
        { x: 720, y: 280 },
        { x: 760, y: 280 },

        { x: 160, y: 360 },
        { x: 200, y: 360 },
        { x: 240, y: 360 },
        { x: 280, y: 360 },
        { x: 320, y: 360 },

        { x: 440, y: 360 },
        { x: 480, y: 360 },
        { x: 520, y: 360 },
        { x: 560, y: 360 },
        { x: 600, y: 360 },

        { x: 0, y: 440 },
        { x: 40, y: 440 },
        { x: 80, y: 440 },
        { x: 120, y: 440 },
        { x: 160, y: 440 },

        { x: 240, y: 440 },
        { x: 280, y: 440 },
        { x: 320, y: 440 },
        { x: 400, y: 440 },
        { x: 440, y: 440 },
        { x: 480, y: 440 },

        { x: 560, y: 440 },
        { x: 600, y: 440 },
        { x: 640, y: 440 },
        { x: 680, y: 440 },

        { x: 120, y: 520 },
        { x: 280, y: 520 },
        { x: 440, y: 520 },
        { x: 600, y: 520 },
      ],
    },
  },
  levelTwo: {
    canvas: {
      width: 800,
      height: 600,
    },

    player: {
      width: 40,
      height: 40,
      step: 20,
      startPosition: {
        x: 40,
        y: 40,
      },
    },

    enemy: {
      width: 40,
      height: 40,
      step: 40,
      startPositions: {
        easy: [
          { x: 520, y: 0 },
          { x: 760, y: 280 },
          { x: 240, y: 480 },
          { x: 80, y: 280 },
          { x: 440, y: 240 },
          { x: 440, y: 320 },
        ],
        moderate: [
          { x: 280, y: 80 },
          { x: 680, y: 80 },
          { x: 760, y: 280 },
          { x: 680, y: 480 },
          { x: 240, y: 480 },
          { x: 80, y: 280 },
          { x: 440, y: 240 },
          { x: 600, y: 280 },
          { x: 440, y: 320 },
        ],
        hard: [
          { x: 280, y: 80 },
          { x: 520, y: 0 },
          { x: 680, y: 80 },
          { x: 760, y: 280 },
          { x: 680, y: 480 },
          { x: 480, y: 560 },
          { x: 240, y: 480 },
          { x: 0, y: 560 },
          { x: 80, y: 280 },
          { x: 200, y: 160 },
          { x: 440, y: 240 },
          { x: 600, y: 280 },
          { x: 440, y: 320 },
          { x: 200, y: 320 },
        ],
      },
    },

    gems: {
      width: 40,
      height: 40,
      startPositions: [
        { x: 280, y: 40 },
        { x: 520, y: 40 },
        { x: 720, y: 40 },
        { x: 720, y: 280 },
        { x: 720, y: 520 },
        { x: 480, y: 520 },
        { x: 240, y: 520 },
        { x: 40, y: 520 },
        { x: 40, y: 280 },
        { x: 200, y: 200 },
        { x: 440, y: 200 },
        { x: 560, y: 280 },
        { x: 440, y: 360 },
        { x: 200, y: 360 },
      ],
    },

    obstacles: {
      width: 40,
      height: 40,
      startPositions: [
        { x: 120, y: 40 },
        { x: 160, y: 40 },
        { x: 200, y: 40 },

        { x: 360, y: 40 },
        { x: 400, y: 40 },
        { x: 440, y: 40 },

        { x: 600, y: 40 },
        { x: 640, y: 40 },

        { x: 720, y: 120 },
        { x: 720, y: 160 },
        { x: 720, y: 200 },

        { x: 720, y: 360 },
        { x: 720, y: 400 },
        { x: 720, y: 440 },

        { x: 560, y: 520 },
        { x: 600, y: 520 },
        { x: 640, y: 520 },

        { x: 320, y: 520 },
        { x: 360, y: 520 },
        { x: 400, y: 520 },

        { x: 120, y: 520 },
        { x: 160, y: 520 },

        { x: 40, y: 360 },
        { x: 40, y: 400 },
        { x: 40, y: 440 },

        { x: 40, y: 200 },
        { x: 80, y: 200 },
        { x: 120, y: 200 },

        { x: 280, y: 200 },
        { x: 320, y: 200 },
        { x: 360, y: 200 },

        { x: 520, y: 200 },
        { x: 560, y: 200 },

        { x: 520, y: 360 },
        { x: 560, y: 360 },

        { x: 280, y: 360 },
        { x: 320, y: 360 },
        { x: 360, y: 360 },

        { x: 0, y: 120 },
        { x: 40, y: 120 },
        { x: 80, y: 120 },
        { x: 120, y: 120 },
        { x: 160, y: 120 },
        { x: 200, y: 120 },
        { x: 240, y: 120 },
        { x: 280, y: 120 },
        { x: 320, y: 120 },
        { x: 360, y: 120 },
        { x: 400, y: 120 },
        { x: 440, y: 120 },
        { x: 480, y: 120 },
        { x: 520, y: 120 },
        { x: 560, y: 120 },
        { x: 600, y: 120 },
        { x: 640, y: 120 },

        { x: 640, y: 160 },
        { x: 640, y: 200 },
        { x: 640, y: 240 },
        { x: 640, y: 280 },
        { x: 640, y: 320 },
        { x: 640, y: 360 },
        { x: 640, y: 400 },
        { x: 640, y: 440 },

        { x: 120, y: 440 },
        { x: 160, y: 440 },
        { x: 200, y: 440 },
        { x: 240, y: 440 },
        { x: 280, y: 440 },
        { x: 320, y: 440 },
        { x: 360, y: 440 },
        { x: 400, y: 440 },
        { x: 440, y: 440 },
        { x: 480, y: 440 },
        { x: 520, y: 440 },
        { x: 560, y: 440 },
        { x: 600, y: 440 },

        { x: 120, y: 280 },
        { x: 120, y: 320 },
        { x: 120, y: 360 },
        { x: 120, y: 400 },

        { x: 160, y: 280 },
        { x: 200, y: 280 },
        { x: 240, y: 280 },
        { x: 280, y: 280 },
        { x: 320, y: 280 },
        { x: 360, y: 280 },
        { x: 400, y: 280 },
        { x: 440, y: 280 },
        { x: 480, y: 280 },
      ],
    },
  },
  levelThree: {
    canvas: {
      width: 800,
      height: 600,
    },

    player: {
      width: 40,
      height: 40,
      step: 20,
      startPosition: {
        x: 40,
        y: 40,
      },
    },

    enemy: {
      width: 40,
      height: 40,
      step: 40,
      startPositions: {
        easy: [
          { x: 80, y: 280 },
          { x: 240, y: 440 },
          { x: 240, y: 40 },
          { x: 400, y: 360 },
          { x: 560, y: 360 },
          { x: 720, y: 40 },
          { x: 720, y: 360 },
        ],
        moderate: [
          { x: 80, y: 280 },
          { x: 0, y: 520 },
          { x: 160, y: 200 },
          { x: 240, y: 40 },
          { x: 400, y: 360 },
          { x: 400, y: 520 },
          { x: 480, y: 120 },
          { x: 720, y: 40 },
          { x: 720, y: 360 },
          { x: 680, y: 440 },
        ],
        hard: [
          { x: 80, y: 280 },
          { x: 0, y: 520 },
          { x: 240, y: 440 },
          { x: 160, y: 200 },
          { x: 240, y: 40 },
          { x: 320, y: 120 },
          { x: 400, y: 360 },
          { x: 400, y: 520 },
          { x: 560, y: 360 },
          { x: 480, y: 120 },
          { x: 720, y: 40 },
          { x: 720, y: 200 },
          { x: 720, y: 360 },
          { x: 680, y: 440 },
        ],
      },
    },

    gems: {
      width: 40,
      height: 40,
      startPositions: [
        { x: 40, y: 280 },
        { x: 40, y: 520 },
        { x: 200, y: 440 },
        { x: 200, y: 200 },
        { x: 200, y: 40 },
        { x: 360, y: 120 },
        { x: 360, y: 360 },
        { x: 440, y: 520 },
        { x: 520, y: 360 },
        { x: 520, y: 120 },
        { x: 680, y: 40 },
        { x: 680, y: 200 },
        { x: 680, y: 360 },
        { x: 720, y: 440 },
      ],
    },

    obstacles: {
      width: 40,
      height: 40,
      startPositions: [
        { x: 40, y: 120 },
        { x: 40, y: 160 },
        { x: 40, y: 200 },

        { x: 40, y: 360 },
        { x: 40, y: 400 },
        { x: 40, y: 440 },

        { x: 120, y: 520 },
        { x: 160, y: 520 },
        { x: 200, y: 520 },

        { x: 200, y: 280 },
        { x: 200, y: 320 },
        { x: 200, y: 360 },

        { x: 200, y: 120 },

        { x: 280, y: 40 },
        { x: 320, y: 40 },
        { x: 360, y: 40 },

        { x: 360, y: 200 },
        { x: 360, y: 240 },
        { x: 360, y: 280 },

        { x: 360, y: 440 },
        { x: 360, y: 480 },
        { x: 360, y: 520 },

        { x: 520, y: 200 },
        { x: 520, y: 240 },
        { x: 520, y: 280 },

        { x: 520, y: 440 },
        { x: 520, y: 480 },
        { x: 520, y: 520 },

        { x: 520, y: 40 },
        { x: 560, y: 40 },
        { x: 600, y: 40 },

        { x: 760, y: 40 },
        { x: 640, y: 120 },
        { x: 760, y: 200 },
        { x: 640, y: 280 },
        { x: 760, y: 360 },
        { x: 640, y: 440 },

        { x: 120, y: 0 },
        { x: 120, y: 40 },
        { x: 120, y: 80 },
        { x: 120, y: 120 },
        { x: 120, y: 160 },
        { x: 120, y: 200 },
        { x: 120, y: 240 },
        { x: 120, y: 280 },
        { x: 120, y: 320 },
        { x: 120, y: 360 },
        { x: 120, y: 400 },
        { x: 120, y: 440 },

        { x: 280, y: 120 },
        { x: 280, y: 160 },
        { x: 280, y: 200 },
        { x: 280, y: 240 },
        { x: 280, y: 280 },
        { x: 280, y: 320 },
        { x: 280, y: 360 },
        { x: 280, y: 400 },
        { x: 280, y: 440 },
        { x: 280, y: 480 },
        { x: 280, y: 520 },
        { x: 280, y: 560 },
        { x: 280, y: 560 },

        { x: 440, y: 0 },
        { x: 440, y: 40 },
        { x: 440, y: 80 },
        { x: 440, y: 120 },
        { x: 440, y: 160 },
        { x: 440, y: 200 },
        { x: 440, y: 240 },
        { x: 440, y: 280 },
        { x: 440, y: 320 },
        { x: 440, y: 360 },
        { x: 440, y: 400 },
        { x: 440, y: 440 },

        { x: 600, y: 120 },
        { x: 600, y: 160 },
        { x: 600, y: 200 },
        { x: 600, y: 240 },
        { x: 600, y: 280 },
        { x: 600, y: 320 },
        { x: 600, y: 360 },
        { x: 600, y: 400 },
        { x: 600, y: 440 },
        { x: 600, y: 480 },
        { x: 600, y: 520 },
        { x: 600, y: 560 },
        { x: 600, y: 560 },
      ],
    },
  },
}
