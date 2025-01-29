import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import PlayerStatsDialog from '@/components/elements/players-stats-dialog'

describe('PlayerStatsDialog', () => {
  test('renders without crashing', () => {
    render(
      <PlayerStatsDialog
        player={{
          id: '1',
          name: 'John Doe',
          sport: 'Soccer',
          position: 'Forward',
          performance: {
            totalActions: 10,
            successfulActions: 8,
            successRate: 80,
            contestsWon: 2,
            conversions: {
              attempted: 1,
              successful: 1,
              rate: 100,
            },
            distanceCovered: {
              total: 100,
              highIntensity: 20,
            },
            possession: {
              timeInSeconds: 300,
              percentageOfGame: 50,
            },
          },
        }}
      />,
    )
    expect(screen.getByText('John Doe')).toBeInTheDocument()
  })
})
