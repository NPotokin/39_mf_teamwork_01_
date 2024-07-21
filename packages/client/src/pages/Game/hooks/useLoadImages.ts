import { useEffect, useState } from 'react'
import rock from '@images/rock.png'
import pumpkin from '@images/pumpkin.png'

import foxFrame1 from '../../../assets/images/fox/fox_walk1.png'
import foxFrame2 from '../../../assets/images/fox/fox_walk2.png'
import foxFrame3 from '../../../assets/images/fox/fox_walk3.png'
import foxFrame4 from '../../../assets/images/fox/fox_walk4.png'

import pandaFrame1 from '../../../assets/images/panda/panda_walk1.png'
import pandaFrame2 from '../../../assets/images/panda/panda_walk2.png'
import pandaFrame3 from '../../../assets/images/panda/panda_walk3.png'
import pandaFrame4 from '../../../assets/images/panda/panda_walk4.png'

import pandaFrameLeft1 from '../../../assets/images/panda_left/panda_walk1.png'
import pandaFrameLeft2 from '../../../assets/images/panda_left/panda_walk2.png'
import pandaFrameLeft3 from '../../../assets/images/panda_left/panda_walk3.png'
import pandaFrameLeft4 from '../../../assets/images/panda_left/panda_walk4.png'

import pumpkinFrame1 from '../../../assets/images/pumpkin/pumpkin10.png'
import pumpkinFrame2 from '../../../assets/images/pumpkin/pumpkin11.png'
import pumpkinFrame3 from '../../../assets/images/pumpkin/pumpkin12.png'
import pumpkinFrame4 from '../../../assets/images/pumpkin/pumpkin10.png'

const useLoadImages = () => {
  // Пре-прогружаем картинки - иначе RAF не отрабатывает
  const [imagesLoaded, setImagesLoaded] =
    useState(false)
  const [images, setImages] = useState({
    rock: new Image(),
    foxFrames: [] as HTMLImageElement[],
    pandaFrames: [] as HTMLImageElement[],
    pandaFramesLeft: [] as HTMLImageElement[],
    pumpkinFrames: [] as HTMLImageElement[],
  })

  useEffect(() => {
    const rockImg = new Image()

    const foxFrames = [
      foxFrame1,
      foxFrame2,
      foxFrame3,
      foxFrame4,
    ].map(src => {
      const img = new Image()
      img.src = src
      return img
    })
    const pandaFrames = [
      pandaFrame1,
      pandaFrame2,
      pandaFrame3,
      pandaFrame4,
    ].map(src => {
      const img = new Image()
      img.src = src
      return img
    })
    const pandaFramesLeft = [
      pandaFrameLeft1,
      pandaFrameLeft2,
      pandaFrameLeft3,
      pandaFrameLeft4,
    ].map(src => {
      const img = new Image()
      img.src = src
      return img
    })

    const pumpkinFrames = [
      pumpkinFrame1,
      pumpkinFrame2,
      pumpkinFrame3,
      pumpkinFrame4,
    ].map(src => {
      const img = new Image()
      img.src = src
      return img
    })

    let loaded = 0
    const total =
      2 + foxFrames.length + pandaFrames.length

    const onLoad = () => {
      loaded += 1
      if (loaded === total) {
        setImagesLoaded(true)
      }
    }

    rockImg.src = rock

    rockImg.onload = onLoad
    foxFrames.forEach(
      img => (img.onload = onLoad)
    )
    pandaFrames.forEach(
      img => (img.onload = onLoad)
    )
    pandaFramesLeft.forEach(
      img => (img.onload = onLoad)
    )
    pumpkinFrames.forEach(
      img => (img.onload = onLoad)
    )

    setImages({
      rock: rockImg,
      foxFrames: foxFrames,
      pandaFrames: pandaFrames,
      pandaFramesLeft: pandaFramesLeft,
      pumpkinFrames: pumpkinFrames,
    })
  }, [])
  return { imagesLoaded, images }
}
export default useLoadImages
