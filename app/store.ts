import { create } from 'zustand'
import { Player, DepthChart, Sport, PlayerStats } from './types'

interface DepthChartStore {
  depthCharts: DepthChart[]
  addSport: (sport: Sport) => void
  addPlayer: (sport: Sport, player: PlayerStats, spot?: number) => void
  removePlayer: (sport: Sport, position: string, playerId: string) => void
  getFullDepthChart: (sport?: Sport) => DepthChart[]
  getPlayersBelow: (sport: Sport, position: string, playerId: string) => Player[]
}

export const useDepthChartStore = create<DepthChartStore>((set, get) => ({
  depthCharts: [],

  addSport: sport => {
    set(state => {
      const sportChart = state.depthCharts.find(chart => chart.sport.name === sport.name)
      if (!sportChart) {
        state.depthCharts.push({ sport, chart: [] })
      }
      return { depthCharts: [...state.depthCharts] }
    })
  },

  addPlayer: (sport, player, spot) => {
    const { position } = player
    set(state => {
      const sportChart = state.depthCharts.find(chart => chart.sport.name === player.sport)
      if (!sportChart) {
        const newChart: DepthChart = { sport, chart: [] }
        state.depthCharts.push(newChart)
      }
      const chart = state.depthCharts.find(chart => chart.sport.name === player.sport)!.chart
      const posEntry = chart.find(entry => entry.position === player.position)
      if (!posEntry) {
        chart.push({ position, players: [player] })
      } else {
        if (spot !== undefined) {
          posEntry.players.splice(spot, 0, player)
        } else {
          posEntry.players.push(player)
        }
      }
      return { depthCharts: [...state.depthCharts] }
    })
  },

  removePlayer: (sport, position, playerId) => {
    set(state => {
      const sportChart = state.depthCharts.find(chart => chart.sport.name === sport.name)
      if (sportChart) {
        const posEntry = sportChart.chart.find(entry => entry.position === position)
        if (posEntry) {
          posEntry.players = posEntry.players.filter(player => player.id !== playerId)
        }
      }
      return { depthCharts: [...state.depthCharts] }
    })
  },

  getFullDepthChart: sport => {
    const { depthCharts } = get()
    return sport ? depthCharts.filter(chart => chart.sport.name === sport.name) : depthCharts
  },

  getPlayersBelow: (sport, position, playerId) => {
    const { depthCharts } = get()
    const sportChart = depthCharts.find(chart => chart.sport.name === sport.name)
    if (sportChart) {
      const posEntry = sportChart.chart.find(entry => entry.position === position)
      if (posEntry) {
        const playerIndex = posEntry.players.findIndex(player => player.id === playerId)
        if (playerIndex !== -1) {
          return posEntry.players.slice(playerIndex + 1)
        }
      }
    }
    return []
  },
}))
