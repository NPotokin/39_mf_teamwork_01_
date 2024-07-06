import React from 'react'
import GameModal from '../../../components/GameModal/GameModal'
import pandaWin from '@images/panda_win.svg'
import pandaLost from '@images/panda_over.svg'

export const WinModal = ({ visible, onYesClick, score }) => (
  <GameModal
    visible={visible}
    imageSrc={pandaWin}
    titleClass={'nes-text is-success'}
    title={'You Win!'}
    subtitle={'Play again?'}
    onYesClick={onYesClick}
    score={score}
  />
)
export const GameOverModal = ({ visible, onYesClick, score }) => (
  <GameModal
    visible={visible}
    imageSrc={pandaLost}
    titleClass={'nes-text is-warning'}
    title={'Game Over'}
    subtitle={'Play again?'}
    onYesClick={onYesClick}
    score={score}
  />
)
