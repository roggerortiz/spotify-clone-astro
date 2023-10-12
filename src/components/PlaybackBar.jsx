import { usePlayerStore } from '@/store/playerStore'
import { useEffect, useState } from 'react'
import { Slider } from './Slider'

export function PlaybackBar({ audio }) {
  const { setIsPlaying } = usePlayerStore((state) => state)
  const [canUpdateCurrentTime, setCanUpdateCurrentTime] = useState(true)
  const [updateCurrentTime, setUpdateCurrentTime] = useState(0)
  const [currentTimeTemp, setCurrentTimeTemp] = useState(0)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)

  const formatTime = (time) => {
    if (!audio) {
      return '-:--'
    }

    if (!time) {
      return '0:00'
    }

    const seconds = Math.floor(time % 60)
    const minutes = Math.floor(time / 60)

    return `${minutes}:${seconds.toString().padStart(2, '0')}`
  }

  const handleLoadedData = () => {
    setDuration(audio.duration)
  }

  const handleTimeUpdate = () => {
    const newCurrentTimeTemp = audio?.currentTime ?? 0
    setCurrentTimeTemp(newCurrentTimeTemp)
  }

  const handleChangeTime = (value) => {
    const [newCurrentTime] = value
    setCurrentTime(newCurrentTime)
  }

  const handlePointerDownTime = () => {
    setCanUpdateCurrentTime(false)
  }

  const handlePointerUpTime = () => {
    audio.currentTime = currentTime

    if (currentTime && duration && currentTime === duration) {
      setIsPlaying(false)
    }

    setTimeout(() => {
      setCanUpdateCurrentTime(true)
    }, 300)
  }

  useEffect(() => {
    audio?.addEventListener('loadeddata', handleLoadedData)
    audio?.addEventListener('timeupdate', handleTimeUpdate)
    return () => {
      audio?.removeEventListener('loadeddata', handleLoadedData)
      audio?.removeEventListener('timeupdate', handleTimeUpdate)
    }
  }, [audio])

  useEffect(() => {
    if (canUpdateCurrentTime && currentTimeTemp) {
      const newCurrentTime = currentTimeTemp
      setCurrentTime(newCurrentTime)

      if (newCurrentTime && duration && newCurrentTime === duration) {
        setIsPlaying(false)
      }
    }
  }, [canUpdateCurrentTime, currentTimeTemp])

  return (
    <div className='flex flex-row items-center justify-center gap-2 text-xs w-full'>
      <span className='opacity-50 min-w-[40px] text-right'>{formatTime(currentTime)}</span>

      <Slider
        min={0}
        max={duration}
        className='w-full h-3'
        defaultValue={[0]}
        value={[currentTime]}
        onValueChange={handleChangeTime}
        onPointerDown={handlePointerDownTime}
        onPointerUp={handlePointerUpTime}
      />

      <span className='opacity-50 min-w-[40px] text-left'>{formatTime(duration)}</span>
    </div>
  )
}
