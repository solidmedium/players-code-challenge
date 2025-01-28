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
      // Check if the sport already exists in the depth chart
      const sportChart = state.depthCharts.find(chart => chart.sport.name === sport.name)
      if (!sportChart) {
        // If the sport doesn't exist, add it to the depth
        state.depthCharts.push({ sport, chart: [] })
      }
      // Return the updated state
      return { depthCharts: [...state.depthCharts] }
    })
  },

  addPlayer: (sport, player, spot) => {
    // Destructure the player object and default to string if undefined
    const position = player.position || ''
    set(state => {
      const sportChart = state.depthCharts.find(chart => chart.sport.name === player.sport)
      if (!sportChart) {
        const newChart: DepthChart = { sport, chart: [] }
        state.depthCharts.push(newChart)
      }
      const chart = state.depthCharts.find(chart => chart.sport.name === player.sport)!.chart
      const posEntry = chart.find(entry => entry.position === player.position)
      if (!posEntry) {
        // Adds position to the depth chart if it doesn't exist (new sports only)
        console.log(`Position ${position} does not exist in the depth chart`)
        chart.push({ position, players: [player] })
      } else {
        if (spot !== undefined) {
          // Insert player at specific spot
          console.log(`Inserting player at spot ${spot}`)
          posEntry.players.splice(spot, 0, player)
        } else {
          // Adds player to the end of the list
          console.log(`Adding player to the end of the list`)
          posEntry.players.push(player)
        }
      }
      return { depthCharts: [...state.depthCharts] }
    })
  },

  removePlayer: (sport, position, playerId) => {
    set(state => {
      // Find the sport chart
      const sportChart = state.depthCharts.find(chart => chart.sport.name === sport.name)
      if (sportChart) {
        // Find the position entry
        const posEntry = sportChart.chart.find(entry => entry.position === position)
        if (posEntry) {
          // Remove the player from the position entry
          posEntry.players = posEntry.players.filter(player => player.id !== playerId)
        }
      }
      // Return the updated state
      return { depthCharts: [...state.depthCharts] }
    })
  },

  getFullDepthChart: sport => {
    const { depthCharts } = get()
    return sport ? depthCharts.filter(chart => chart.sport.name === sport.name) : depthCharts
  },

  // TODO: Implement getPlayersBelow
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
