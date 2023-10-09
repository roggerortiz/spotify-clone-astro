import { usePlayerStore } from '@/store/playerStore'
import { Pause } from './Pause'
import { Play } from './Play'

export function CardPlayButton({ id }) {
  const { isPlaying, currentMusic, setIsPlaying, setCurrentMusic } = usePlayerStore(
    (state) => state
  )

  const isPlayingPlaylist = isPlaying && currentMusic?.playlist?.id === id

  const handleClick = () => {
    if (isPlayingPlaylist) {
      setIsPlaying(false)
      return
    }

    fetch(`/api/get-info-playlist.json?id=${id}`)
      .then((res) => res.json())
      .then((data) => {
        const { songs, playlist } = data

        setIsPlaying(true)
        setCurrentMusic({ songs, playlist, song: songs.length ? songs[0] : null })
      })
  }

  return (
    <button
      className='card-play-button rounded-full bg-green-500 shadow-2xl p-4'
      onClick={handleClick}
    >
      {isPlayingPlaylist ? <Pause /> : <Play />}
    </button>
  )
}
