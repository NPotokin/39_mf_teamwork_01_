import { useEffect, useRef, useState } from 'react'

const useSound = (url: string, volume = 1.0, loop = false) => {
  const audioContextRef = useRef<AudioContext | null>(null)
  const audioBufferRef = useRef<AudioBuffer | null>(null)
  const gainNodeRef = useRef<GainNode | null>(null)
  const [sourceRef, setSourceRef] = useState<AudioBufferSourceNode | null>(null)

  useEffect(() => {
    const fetchAudio = async () => {
      audioContextRef.current = new (window.AudioContext ||
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (window as any).webkitAudioContext)()
      gainNodeRef.current = audioContextRef.current.createGain()
      gainNodeRef.current.gain.value = volume // Set the initial volume
      gainNodeRef.current.connect(audioContextRef.current.destination)

      const response = await fetch(url)
      const arrayBuffer = await response.arrayBuffer()
      audioBufferRef.current = await audioContextRef.current.decodeAudioData(
        arrayBuffer
      )
    }

    fetchAudio()

    return () => {
      audioContextRef.current?.close()
    }
  }, [url, volume])

  const playSound = () => {
    if (
      audioContextRef.current &&
      audioBufferRef.current &&
      gainNodeRef.current
    ) {
      const source = audioContextRef.current.createBufferSource()
      source.buffer = audioBufferRef.current
      source.loop = loop // Set looping
      source.connect(gainNodeRef.current)
      source.start(0)
      setSourceRef(source)
    }
  }

  const stopSound = () => {
    sourceRef?.stop()
    setSourceRef(null) // Clear the reference to the stopped source
  }

  return { playSound, stopSound }
}

export default useSound
