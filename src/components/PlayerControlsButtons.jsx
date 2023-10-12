import { usePlayerStore } from '@/store/playerStore'
import { Pause } from './Pause'
import { Play } from './Play'

export function PlayerControlsButtons() {
  const { isPlaying, currentMusic, setIsPlaying } = usePlayerStore((state) => state)
  const { playlist, song } = currentMusic ?? {}
  const isDisabled = Boolean(!playlist || !song)

  const handlePlayingChange = () => {
    if (!isDisabled) {
      setIsPlaying(!isPlaying)
    }
  }

  return (
    <div className='flex flex-row gap-4 justify-center mb-2 w-full'>
      <button
        disabled={isDisabled}
        className='bg-white rounded-full p-2'
        onClick={handlePlayingChange}
      >
        {isPlaying ? <Pause /> : <Play />}
      </button>
    </div>
  )
}
