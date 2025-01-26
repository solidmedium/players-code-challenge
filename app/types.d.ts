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
