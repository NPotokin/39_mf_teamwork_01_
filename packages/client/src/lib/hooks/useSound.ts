import {
  useEffect,
  useRef,
  useState,
} from 'react'

// Хук для запуска/остановки мелодии
const useSound = (
  url: string,
  volume = 1.0,
  loop = false
) => {
  // В useRef храним ссылки на AudioContext, AudioBuffer, GainNode
  const audioContextRef =
    useRef<AudioContext | null>(null)
  const audioBufferRef =
    useRef<AudioBuffer | null>(null)
  const gainNodeRef = useRef<GainNode | null>(
    null
  )
  // Храним текущее Состояние ноды AudioBufferSourceNode
  const [sourceRef, setSourceRef] =
    useState<AudioBufferSourceNode | null>(null)

  useEffect(() => {
    // вытаскиваем аудио файл и декодируем его в AudioBuffer
    const fetchAudio = async () => {
      // Создаем новый AudioContext (без поддержки старых браузеров)
      audioContextRef.current =
        new window.AudioContext()
      // Создаем GainNode для контроля громкости
      // и связываем его с выводом AudioContext
      gainNodeRef.current =
        audioContextRef.current.createGain()
      // Задаем громкость по умолчанию
      gainNodeRef.current.gain.value = volume
      gainNodeRef.current.connect(
        audioContextRef.current.destination
      )

      // Подтягиваем аудио файл из УРЛа
      const response = await fetch(url)
      const arrayBuffer =
        await response.arrayBuffer()
      // Декодируем аудио в AudioBuffer
      audioBufferRef.current =
        await audioContextRef.current.decodeAudioData(
          arrayBuffer
        )
    }
    // Вызываем
    fetchAudio()

    // Функция очистки AudioContext
    return () => {
      audioContextRef.current?.close()
    }
  }, [url, volume])
  // Функция воспроизведения звука
  const playSound = () => {
    if (
      audioContextRef.current &&
      audioBufferRef.current &&
      gainNodeRef.current
    ) {
      // Создаем ноду AudioBufferSourceNode
      const source =
        audioContextRef.current.createBufferSource()
      source.buffer = audioBufferRef.current
      source.loop = loop // Зацикливаем
      // Коннектим source с GainNode
      // который уже связан с выводом звука (см строку 19)
      source.connect(gainNodeRef.current)
      source.start(0)
      setSourceRef(source)
    }
  }
  // Функия остановки звука
  const stopSound = () => {
    sourceRef?.stop()
    setSourceRef(null)
  }

  return { playSound, stopSound }
}

export default useSound
