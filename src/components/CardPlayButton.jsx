import { usePlayerStore } from '@/store/playerStore'
import { PauseLarge } from './PauseLarge'
import { PlayLarge } from './PlayLarge'

export function CardPlayButton({ id, size = 'small' }) {
  const btnSizeClassName = size === 'small' ? 'w-12 h-12' : 'w-14 h-14'
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
      className={`card-play-button flex justify-center items-center rounded-full bg-green-500 shadow-2xl ${btnSizeClassName} hover:scale-105 transition hover:bg-green-400`}
      onClick={handleClick}
    >
      {isPlayingPlaylist ? <PauseLarge /> : <PlayLarge />}
    </button>
  )
}
