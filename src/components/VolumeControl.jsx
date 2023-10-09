import { usePlayerStore } from '@/store/playerStore'
import { useRef } from 'react'
import { Slider } from './Slider'
import { Volume } from './Volume'
import { VolumeSilence } from './VolumeSilence'

export function VolumeControl() {
  const { volume, setVolume } = usePlayerStore((state) => state)
  const previousVolumeRef = useRef(volume)
  const isVolumeSilenced = volume === 0

  const handleClickVolumen = () => {
    if (isVolumeSilenced) {
      setVolume(previousVolumeRef.current)
    } else {
      previousVolumeRef.current = volume
      setVolume(0)
    }
  }

  const handleChangeVolume = (value) => {
    const [newVolume] = value
    setVolume(newVolume / 100)
  }

  return (
    <div className='flex justify-center gap-x-2'>
      <button
        className='opacity-70 hover:opacity-100 transition'
        onClick={handleClickVolumen}
      >
        {isVolumeSilenced ? <VolumeSilence /> : <Volume />}
      </button>

      <Slider
        min={0}
        max={100}
        className='w-[95px]'
        defaultValue={[100]}
        value={[volume * 100]}
        onValueChange={handleChangeVolume}
      />
    </div>
  )
}
