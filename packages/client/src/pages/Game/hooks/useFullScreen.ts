import {
  useState,
  useEffect,
  useRef,
  MutableRefObject,
} from 'react'

const useFullscreen = () => {
  const [isFullscreen, setIsFullscreen] =
    useState(false)
  const elementRef = useRef<HTMLElement | null>(
    null
  ) as MutableRefObject<HTMLElement | null>

  const handleFullscreen = () => {
    if (elementRef.current) {
      if (!document.fullscreenElement) {
        elementRef.current
          .requestFullscreen()
          .then(() => setIsFullscreen(true))
          .catch(err => console.error(err))
      } else {
        document
          .exitFullscreen()
          .then(() => setIsFullscreen(false))
          .catch(err => console.error(err))
      }
    }
  }

  useEffect(() => {
    const onFullscreenChange = () => {
      if (!document.fullscreenElement) {
        setIsFullscreen(false)
      }
    }

    document.addEventListener(
      'fullscreenchange',
      onFullscreenChange
    )

    return () => {
      document.removeEventListener(
        'fullscreenchange',
        onFullscreenChange
      )
    }
  }, [])

  return {
    isFullscreen,
    handleFullscreen,
    elementRef,
  }
}

export default useFullscreen
