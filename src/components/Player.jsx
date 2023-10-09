import { usePlayerStore } from '@/store/playerStore'
import { useEffect, useRef } from 'react'
import { CurrentSong } from './CurrentSong'
import { Pause } from './Pause'
import { Play } from './Play'
import { VolumeControl } from './VolumeControl'

export function Player() {
  const { volume, isPlaying, currentMusic, setIsPlaying } = usePlayerStore((state) => state)
  const { playlist, songs, song } = currentMusic ?? {}
  const audioRef = useRef()

  const handlePlayingChange = () => {
    setIsPlaying(!isPlaying)
  }

  useEffect(() => {
    if (audioRef.current) {
      isPlaying ? audioRef.current.play() : audioRef.current.pause()
      console.log({ volume })
      audioRef.current.volume = volume
    }
  }, [isPlaying, playlist])

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume
    }
  }, [volume])

  if (!playlist || !song) {
    return <></>
  }

  return (
    <div className='flex flex-row justify-between w-full px-4 z-50'>
      <CurrentSong />

      <div className='grid place-content-center gap-4 flex-1'>
        <div className='flex justify-center'>
          <button
            className='bg-white rounded-full p-2'
            onClick={handlePlayingChange}
          >
            {isPlaying ? <Pause /> : <Play />}
          </button>
        </div>
      </div>

      <div className='grid place-content-center'>
        <VolumeControl />
      </div>

      <audio
        ref={audioRef}
        src={`/music/${playlist.id}/${song.id.toString().padStart(2, '0')}.mp3`}
      />
    </div>
  )
}
