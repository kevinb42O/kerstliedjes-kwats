import { Player } from './types'

export function generatePlayerId(): string {
  return `player-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
}

export function getRandomPlayerIndex(players: Player[], excludeIndex?: number): number {
  if (players.length === 0) return -1
  if (players.length === 1) return 0
  
  const availableIndices = players
    .map((_, i) => i)
    .filter(i => i !== excludeIndex)
  
  if (availableIndices.length === 0) return Math.floor(Math.random() * players.length)
  
  return availableIndices[Math.floor(Math.random() * availableIndices.length)]
}

export function ensureUniqueName(name: string, existingPlayers: Player[]): string {
  const baseName = name.trim()
  const existingNames = existingPlayers.map(p => p.name)
  
  if (!existingNames.includes(baseName)) {
    return baseName
  }
  
  let counter = 2
  while (existingNames.includes(`${baseName} (${counter})`)) {
    counter++
  }
  
  return `${baseName} (${counter})`
}

export function getLeaderboard(players: Player[]): Player[] {
  return [...players].sort((a, b) => b.score - a.score)
}
