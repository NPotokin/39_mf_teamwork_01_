import { act, renderHook } from '@testing-library/react'
import useGameLogic, {
  GameProps,
  Modals,
  Sound,
  type UseGameType,
} from '../hooks/useGameLogic'
import { Constants, ILevel } from '../constants'
import { useSoundsMock, useModalsMock } from './mocks/gameHooks'

const initial: GameProps = {
  level: Constants.levelOne,
  sounds: useSoundsMock(),
  modals: useModalsMock(),
}

describe('useGameLogic', () => {
  let gameLogic: UseGameType
  let mockSounds: Sound
  let mockModals: Modals
  let level: ILevel

  beforeAll(() => {
    level = initial.level
    mockSounds = initial.sounds
    mockModals = initial.modals

    const { result } = renderHook(() => useGameLogic(initial))
    gameLogic = result.current
  })

  describe('Initialization', () => {
    it('should set starting positions of player and gems', () => {
      expect(gameLogic.playerPosition).toEqual(level.player.startPosition)
      expect(gameLogic.gems).toEqual(level.gems.startPositions)
    })

    it('should set enemy level to hard by default', () => {
      expect(gameLogic.enemies).toEqual(level.enemy.startPositions.hard)
    })
  })

  describe('Game end scenarios', () => {
    describe('Victory', () => {
      beforeEach(() => {
        gameLogic.handleVictory()
      })

      afterEach(() => {
        jest.clearAllMocks()
      })

      it('should show win modal', () => {
        const winModalSpy = jest.spyOn(mockModals, 'showGameWinModal')

        expect(winModalSpy).toHaveBeenCalledTimes(1)
      })

      it('should set the game activity state to false', () => {
        const setGameIsActiveSpy = jest.spyOn(mockModals, 'setIsGameActive')

        expect(setGameIsActiveSpy).toHaveBeenCalledWith(false)
      })

      it('should stop the gameSound and play the victorySound', () => {
        const stopGameSoundSpy = jest.spyOn(mockSounds, 'stopGameSound')
        const playVictorySoundSpy = jest.spyOn(mockSounds, 'playVictorySound')

        expect(stopGameSoundSpy).toHaveBeenCalledTimes(1)
        expect(playVictorySoundSpy).toHaveBeenCalledTimes(1)
      })
    })

    describe('Defeat', () => {
      beforeEach(() => {
        gameLogic.handleDefeat()
      })

      afterEach(() => {
        jest.clearAllMocks()
      })

      it('should show defeat modal', () => {
        const loseGameModalSpy = jest.spyOn(mockModals, 'showGameOverModal')

        expect(loseGameModalSpy).toHaveBeenCalledTimes(1)
      })

      it('should set the game activity state to false', () => {
        const setGameIsActiveSpy = jest.spyOn(mockModals, 'setIsGameActive')

        expect(setGameIsActiveSpy).toHaveBeenCalledWith(false)
      })

      it('should stop the gameSound and play the defeatSound', () => {
        const stopGameSoundSpy = jest.spyOn(mockSounds, 'stopGameSound')
        const playDefeatSoundSpy = jest.spyOn(mockSounds, 'playDefeatSound')

        expect(stopGameSoundSpy).toHaveBeenCalledTimes(1)
        expect(playDefeatSoundSpy).toHaveBeenCalledTimes(1)
      })
    })
  })

  describe('Restart game', () => {
    afterEach(() => {
      jest.clearAllMocks()
    })

    it('should close startModal, winModal or defeatModal', () => {
      const { result } = renderHook(() => useGameLogic(initial))
      const hideStartModalSpy = jest.spyOn(mockModals, 'hideStartModal')
      const hideGameWinModalSpy = jest.spyOn(mockModals, 'hideGameWinModal')
      const hideGameOverModalSpy = jest.spyOn(mockModals, 'hideGameOverModal')

      act(() => result.current.resetPositions())

      expect(hideStartModalSpy).toHaveBeenCalledTimes(1)
      expect(hideGameWinModalSpy).toHaveBeenCalledTimes(1)
      expect(hideGameOverModalSpy).toHaveBeenCalledTimes(1)
    })

    it('should return starting positions for player and gems', () => {
      const { result } = renderHook(() => useGameLogic(initial))

      act(() => result.current.setPlayerPosition({ x: 50, y: 25 }))
      act(() =>
        result.current.setGems([
          { x: 2, y: 5 },
          { x: 10, y: 15 },
        ])
      )
      act(() => result.current.resetPositions())

      expect(result.current.playerPosition).toEqual(level.player.startPosition)
      expect(result.current.gems).toEqual(level.gems.startPositions)
    })

    it('should set the game status to active', () => {
      const setGameIsActiveSpy = jest.spyOn(mockModals, 'setIsGameActive')

      gameLogic.resetPositions()

      expect(setGameIsActiveSpy).toHaveBeenCalledWith(true)
    })
    it('should start playing gameSound', () => {
      const playGameSoundSpy = jest.spyOn(mockSounds, 'playGameSound')

      gameLogic.resetPositions()

      expect(playGameSoundSpy).toHaveBeenCalledTimes(1)
    })
  })

  // describe.only('Keyboard control', () => {
  //   it('should move to the right after pressing the ArrowRight', () => {
  //     const { result } = renderHook(() => useGameLogic(initial))
  //     const event = new KeyboardEvent('keypress', { key: 'ArrowRight' })

  //     expect(result.current.playerPosition).toEqual(level.player.startPosition)
  //     window.dispatchEvent(event)

  //     expect(result.current.playerPosition).toEqual({ x: 20, y: 0 })
  //   })
  // })
})
