export interface Player {
  id: string
  name: string
}

export interface DepthChartEntry {
  position: string
  players: Player[]
}

export interface Sport {
  name: string
  positions: string[]
}

export interface DepthChart {
  sport: Sport
  chart: DepthChartEntry[]
}

export interface Spots {
  label: string
  value: string
}

export interface PlayerStats {
  id: string
  name: string
  sport?: string
  position?: string
  performance?: {
    totalActions: number
    successfulActions: number
    successRate: number
    contestsWon: number
    conversions: {
      attempted: number
      successful: number
      rate: number
    }
    distanceCovered: {
      total: number
      highIntensity: number
    }
    possession: {
      timeInSeconds: number
      percentageOfGame: number
    }
  }
}
