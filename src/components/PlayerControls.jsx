import { usePlayerStore } from '@/store/playerStore'
import { useEffect, useRef } from 'react'
import { PlaybackBar } from './PlaybackBar'
import { PlayerControlsButtons } from './PlayerControlsButtons'

export function PlayerControls() {
  const { volume, isPlaying, currentMusic } = usePlayerStore((state) => state)
  const { playlist, song } = currentMusic ?? {}
  const audioRef = useRef()

  const getAudioPath = () => {
    if (!playlist || !song) {
      return undefined
    }

    return `/music/${playlist.id}/${song.id.toString().padStart(2, '0')}.mp3`
  }

  useEffect(() => {
    if (audioRef.current) {
      isPlaying ? audioRef.current.play() : audioRef.current.pause()
      audioRef.current.volume = volume
    }
  }, [isPlaying, playlist])

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume
    }
  }, [volume])

  return (
    <div className='w-full sm:w-1/2'>
      <div className='flex flex-col justify-center items-center w-full'>
        <PlayerControlsButtons />

        <PlaybackBar audio={audioRef?.current} />

        <audio
          ref={audioRef}
          src={getAudioPath()}
        />
      </div>
    </div>
  )
}
