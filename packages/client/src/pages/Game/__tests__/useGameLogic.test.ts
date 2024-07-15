import {
  act,
  fireEvent,
  renderHook,
} from '@testing-library/react'

import useGameLogic, {
  GameLogicProps,
  Modals,
  Sound,
  type UseGameType,
} from '../hooks/useGameLogic'
import { ILevel } from '../constants'
import {
  useSoundsMock,
  useModalsMock,
} from './mocks/gameHooks'
import { mockLevelConstants } from './mocks/levelData'

const initial: GameLogicProps = {
  level: mockLevelConstants.levelOne,
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

    const { result } = renderHook(() =>
      useGameLogic(initial)
    )
    gameLogic = result.current
  })

  describe('Initialization', () => {
    it('should set starting positions of player and gems', () => {
      expect(gameLogic.playerPosition).toEqual(
        level.player.startPosition
      )
      expect(gameLogic.gems).toEqual(
        level.gems.startPositions
      )
    })

    it('should set enemy level to hard by default', () => {
      expect(gameLogic.enemies).toEqual(
        level.enemy.startPositions.hard
      )
    })

    it('should set the canvas size to 800x600', () => {
      expect(gameLogic.canvasSize).toEqual({
        width: 800,
        height: 600,
      })
    })

    it('should set time, steps and score to zero', () => {
      expect(gameLogic.time).toBe(0)
      expect(gameLogic.steps).toBe(0)
      expect(gameLogic.score).toBe(0)
    })
  })

  describe('Keyboard control', () => {
    afterEach(() => {
      jest.clearAllMocks()
    })

    it('should register a keydown handler to the global object window', () => {
      const addEventListenerSpy = jest.spyOn(
        window,
        'addEventListener'
      )

      renderHook(() => useGameLogic(initial))

      expect(addEventListenerSpy).toBeCalledWith(
        'keydown',
        expect.any(Function)
      )
    })

    it('should remove the keydown handler in the global object window on unmount', () => {
      const removeEventListenerSpy = jest.spyOn(
        window,
        'removeEventListener'
      )

      const { unmount } = renderHook(() =>
        useGameLogic(initial)
      )
      unmount()

      expect(
        removeEventListenerSpy
      ).toBeCalledWith(
        'keydown',
        expect.any(Function)
      )
    })

    it('should move the character correctly using the keyboard arrows', () => {
      const { result } = renderHook(() =>
        useGameLogic(initial)
      )

      act(() => {
        mockModals.isGameActive = true
        fireEvent(
          window,
          new KeyboardEvent('keydown', {
            key: 'ArrowRight',
          })
        )
      })

      expect(
        result.current.playerPosition
      ).toEqual({ x: 20, y: 0 })

      act(() => {
        fireEvent(
          window,
          new KeyboardEvent('keydown', {
            key: 'ArrowDown',
          })
        )
      })

      expect(
        result.current.playerPosition
      ).toEqual({ x: 20, y: 20 })

      act(() => {
        fireEvent(
          window,
          new KeyboardEvent('keydown', {
            key: 'ArrowLeft',
          })
        )
      })

      expect(
        result.current.playerPosition
      ).toEqual({ x: 0, y: 20 })

      act(() => {
        fireEvent(
          window,
          new KeyboardEvent('keydown', {
            key: 'ArrowUp',
          })
        )
      })

      expect(
        result.current.playerPosition
      ).toEqual({ x: 0, y: 0 })
    })

    it("should maintain the player's position when pressing other buttons", () => {
      const { result } = renderHook(() =>
        useGameLogic(initial)
      )

      act(() => {
        mockModals.isGameActive = true
        fireEvent(
          window,
          new KeyboardEvent('keydown', {
            key: 'Enter',
          })
        )
      })

      act(() => {
        fireEvent(
          window,
          new KeyboardEvent('keydown', {
            key: 'Backspace',
          })
        )
      })

      expect(
        result.current.playerPosition
      ).toEqual({ x: 0, y: 0 })
    })
  })

  describe('Gameplay and game end scenarios', () => {
    afterEach(() => {
      jest.clearAllMocks()
    })

    it('should increase points by 100 when picking up gems', () => {
      const { result } = renderHook(() =>
        useGameLogic(initial)
      )

      act(() => {
        mockModals.isGameActive = true
        // сходить вправо, чтобы взять gem ({ x: 20, y: 0 })
        fireEvent(
          window,
          new KeyboardEvent('keydown', {
            key: 'ArrowRight',
          })
        )
      })

      expect(result.current.score).toBe(100)
    })

    it('should increase steps by 1 when moving', () => {
      const { result } = renderHook(() =>
        useGameLogic(initial)
      )

      act(() => {
        mockModals.isGameActive = true
        fireEvent(
          window,
          new KeyboardEvent('keydown', {
            key: 'ArrowRight',
          })
        )
      })

      expect(result.current.steps).toBe(1)
    })

    describe('Victory', () => {
      beforeEach(() => {
        gameLogic.handleVictory()
      })

      afterEach(() => {
        jest.clearAllMocks()
      })

      it('should show win modal', () => {
        const winModalSpy = jest.spyOn(
          mockModals,
          'showGameWinModal'
        )

        expect(winModalSpy).toHaveBeenCalledTimes(
          1
        )
      })

      it('should set the game activity state to false', () => {
        const setGameIsActiveSpy = jest.spyOn(
          mockModals,
          'setIsGameActive'
        )

        expect(
          setGameIsActiveSpy
        ).toHaveBeenCalledWith(false)
      })

      it('should stop the gameSound and play the victorySound', () => {
        const stopGameSoundSpy = jest.spyOn(
          mockSounds,
          'stopGameSound'
        )
        const playVictorySoundSpy = jest.spyOn(
          mockSounds,
          'playVictorySound'
        )

        expect(
          stopGameSoundSpy
        ).toHaveBeenCalledTimes(1)
        expect(
          playVictorySoundSpy
        ).toHaveBeenCalledTimes(1)
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
        const loseGameModalSpy = jest.spyOn(
          mockModals,
          'showGameOverModal'
        )

        expect(
          loseGameModalSpy
        ).toHaveBeenCalledTimes(1)
      })

      it('should set the game activity state to false', () => {
        const setGameIsActiveSpy = jest.spyOn(
          mockModals,
          'setIsGameActive'
        )

        expect(
          setGameIsActiveSpy
        ).toHaveBeenCalledWith(false)
      })

      it('should stop the gameSound and play the defeatSound', () => {
        const stopGameSoundSpy = jest.spyOn(
          mockSounds,
          'stopGameSound'
        )
        const playDefeatSoundSpy = jest.spyOn(
          mockSounds,
          'playDefeatSound'
        )

        expect(
          stopGameSoundSpy
        ).toHaveBeenCalledTimes(1)
        expect(
          playDefeatSoundSpy
        ).toHaveBeenCalledTimes(1)
      })
    })
  })

  describe('Restart game', () => {
    afterEach(() => {
      jest.clearAllMocks()
    })

    it('should close startModal, winModal or defeatModal', () => {
      const { result } = renderHook(() =>
        useGameLogic(initial)
      )
      const hideStartModalSpy = jest.spyOn(
        mockModals,
        'hideStartModal'
      )
      const hideGameWinModalSpy = jest.spyOn(
        mockModals,
        'hideGameWinModal'
      )
      const hideGameOverModalSpy = jest.spyOn(
        mockModals,
        'hideGameOverModal'
      )

      act(() => result.current.resetPositions())

      expect(
        hideStartModalSpy
      ).toHaveBeenCalledTimes(1)
      expect(
        hideGameWinModalSpy
      ).toHaveBeenCalledTimes(1)
      expect(
        hideGameOverModalSpy
      ).toHaveBeenCalledTimes(1)
    })

    it('should return starting positions for player and gems', () => {
      const { result } = renderHook(() =>
        useGameLogic(initial)
      )

      act(() =>
        result.current.setPlayerPosition({
          x: 50,
          y: 25,
        })
      )
      act(() =>
        result.current.setGems([
          { x: 2, y: 5 },
          { x: 10, y: 15 },
        ])
      )
      act(() => result.current.resetPositions())

      expect(
        result.current.playerPosition
      ).toEqual(level.player.startPosition)
      expect(result.current.gems).toEqual(
        level.gems.startPositions
      )
    })

    it('should set the game status to active', () => {
      const setGameIsActiveSpy = jest.spyOn(
        mockModals,
        'setIsGameActive'
      )

      gameLogic.resetPositions()

      expect(
        setGameIsActiveSpy
      ).toHaveBeenCalledWith(true)
    })
    it('should not start playing gameSound by default', () => {
      const playGameSoundSpy = jest.spyOn(
        mockSounds,
        'playGameSound'
      )

      gameLogic.resetPositions()

      expect(
        playGameSoundSpy
      ).toHaveBeenCalledTimes(0)
    })
  })
})
