import { usePlayerStore } from '@/store/playerStore'
import { useEffect } from 'react'
import { PlayerControls } from './PlayerControls'
import { SongControls } from './SongControls'
import { SongInfo } from './SongInfo'

export function Player() {
  const { setCurrentMusic } = usePlayerStore((state) => state)

  const fetchPlaylist = () => {
    fetch('/api/get-info-playlist.json?id=1')
      .then((res) => res.json())
      .then((data) => {
        const { songs, playlist } = data
        const song = songs.length ? songs[0] : null
        setCurrentMusic({ songs, playlist, song })
      })
  }

  useEffect(() => {
    setTimeout(() => fetchPlaylist(), 1000)
  }, [])

  return (
    <div className='flex flex-row justify-center sm:justify-between items-center h-[72px] w-full px-4 z-50'>
      <SongInfo />

      <PlayerControls />

      <SongControls />
    </div>
  )
}
