import { useEffect, useState } from 'react'
import pandaWin from '@images/panda_win.svg'
import pumpkin from '@images/pumpkin.png'
import tiger from '@images/tiger.png'
import rock from '@images/rock.png'

const useLoadImages = () => {
  // Пре-прогружаем картинки - иначе RAF не отрабатывает
  const [imagesLoaded, setImagesLoaded] = useState(false)
  const [images, setImages] = useState({
    rock: new Image(),
    pumpkin: new Image(),
    pandaWin: new Image(),
    tiger: new Image(),
  })
  useEffect(() => {
    const rockImg = new Image()
    const pumpkinImg = new Image()
    const pandaWinImg = new Image()
    const tigerImg = new Image()

    let loaded = 0
    const total = 4

    const onLoad = () => {
      loaded += 1
      if (loaded === total) {
        setImagesLoaded(true)
      }
    }

    rockImg.src = rock
    pumpkinImg.src = pumpkin
    pandaWinImg.src = pandaWin
    tigerImg.src = tiger

    rockImg.onload = onLoad
    pumpkinImg.onload = onLoad
    pandaWinImg.onload = onLoad
    tigerImg.onload = onLoad

    setImages({
      rock: rockImg,
      pumpkin: pumpkinImg,
      pandaWin: pandaWinImg,
      tiger: tigerImg,
    })
  }, [])
  return { imagesLoaded, images }
}
export default useLoadImages
