import { useSound } from '@/lib/hooks'

const useGameSounds = () => {
  // Музыкальное сопровождение
  const { playSound: playDefeatSound } = useSound('sounds/defeat.mp3')
  const { playSound: playVictorySound } = useSound('sounds/victory.mp3')
  const { playSound: playGemSound } = useSound('sounds/gem.mp3')
  const { playSound: playGameSound, stopSound: stopGameSound } = useSound(
    'sounds/game.mp3',
    0.2,
    true
  )
  return {
    playDefeatSound,
    playVictorySound,
    playGemSound,
    playGameSound,
    stopGameSound,
  }
}
export default useGameSounds
