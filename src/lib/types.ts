export interface Player {
  id: string
  name: string
  score: number
}

export interface Song {
  id: string
  original: string
  gibberish: string
  used: boolean
}

export type GamePhase = 'welcome' | 'seating' | 'confirm' | 'playing' | 'leaderboard'

export interface GameState {
  phase: GamePhase
  players: Player[]
  currentPlayerIndex: number
  currentSong: Song | null
  songs: Song[]
  roundNumber: number
}
