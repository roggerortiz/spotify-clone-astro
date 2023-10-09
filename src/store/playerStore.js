import { create } from 'zustand'

export const usePlayerStore = create((set) => ({
  volume: 1,
  isPlaying: false,
  currentMusic: {
    playlist: null,
    song: null,
    songs: []
  },
  setVolume: (volume) => set({ volume }),
  setIsPlaying: (isPlaying) => set({ isPlaying }),
  setCurrentMusic: (currentMusic) => set({ currentMusic })
}))
