import { Sound, Modals } from '../../hooks/useGameLogic'

export const useSoundsMock = jest
  .fn<Sound, []>()
  .mockImplementation((): Sound => {
    const playDefeatSound = jest.fn()
    const playVictorySound = jest.fn()
    const playGemSound = jest.fn()
    const playGameSound = jest.fn()
    const stopGameSound = jest.fn()

    return {
      playDefeatSound,
      playVictorySound,
      playGemSound,
      playGameSound,
      stopGameSound,
    }
  })

export const useModalsMock = jest
  .fn<Modals, []>()
  .mockImplementation((): Modals => {
    const isStartModalVisible = false
    const isGameOverVisible = false
    const isGameWinVisible = false
    const isGameActive = false

    const showStartModal = jest.fn()
    const hideStartModal = jest.fn()
    const showGameOverModal = jest.fn()
    const hideGameOverModal = jest.fn()
    const showGameWinModal = jest.fn()
    const hideGameWinModal = jest.fn()
    const setIsGameActive = jest.fn()

    return {
      isStartModalVisible,
      isGameOverVisible,
      isGameWinVisible,
      isGameActive,
      showStartModal,
      hideStartModal,
      showGameOverModal,
      hideGameOverModal,
      showGameWinModal,
      hideGameWinModal,
      setIsGameActive,
    }
  })
