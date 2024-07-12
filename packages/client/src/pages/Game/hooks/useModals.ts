import { useState } from 'react'

const useModals = () => {
  const [
    isStartModalVisible,
    setIsStartModalVisible,
  ] = useState(true)
  const [
    isGameOverVisible,
    setIsGameOverVisible,
  ] = useState(false)
  const [isGameWinVisible, setIsGameWinVisible] =
    useState(false)
  const [isGameActive, setIsGameActive] =
    useState(false)

  const showStartModal = () =>
    setIsStartModalVisible(true)
  const hideStartModal = () =>
    setIsStartModalVisible(false)
  const showGameOverModal = () =>
    setIsGameOverVisible(true)
  const hideGameOverModal = () =>
    setIsGameOverVisible(false)
  const showGameWinModal = () =>
    setIsGameWinVisible(true)
  const hideGameWinModal = () =>
    setIsGameWinVisible(false)

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
}
export default useModals
