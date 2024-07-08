import GameModal from '../../../components/GameModal/GameModal'
import pandaWin from '@images/panda_win.svg'
import pandaLost from '@images/panda_over.svg'

type IProps = {
  visible: boolean
  onYesClick: VoidFunction
  score: number
}

export const WinModal = ({ visible, onYesClick, score }: IProps) => (
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
export const GameOverModal = ({ visible, onYesClick, score }: IProps) => (
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
