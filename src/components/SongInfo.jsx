import { usePlayerStore } from '@/store/playerStore'

export function SongInfo() {
  const { currentMusic } = usePlayerStore((state) => state)
  const { playlist, song } = currentMusic ?? {}
  const { title, artists, image } = song ?? {}
  const artistsString = artists?.join(', ')

  return (
    <div className='flex items-center gap-4 relative overflow-hidden w-1/3'>
      {Boolean(playlist && song) && (
        <>
          <picture className='h-14 w-14 flex-none'>
            <img
              src={image}
              alt={`Image of ${title} by ${artistsString}`}
              className='rounded-md shadow-lg'
            />
          </picture>

          <div className='flex flex-auto flex-col truncate'>
            <h4 className='text-white text-sm'>{title}</h4>
            <span className='text-[11px] text-gray-400'>{artistsString}</span>
          </div>
        </>
      )}
    </div>
  )
}
