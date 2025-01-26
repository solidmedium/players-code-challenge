import { render, screen, fireEvent } from '@testing-library/react'
import Challenge from '@/components/pages/challenge'
import test, { describe } from 'node:test'

describe('Home component', () => {
  test('renders without crashing', () => {
    render(<Challenge />)
    expect(screen.getByText('Depth Chart Manager')).toBeInTheDocument()
  })

  test('changes displayed depth chart when sport is changed', () => {
    render(<Challenge />)
    const sportSelect = screen.getByRole('combobox', { name: /select a sport/i })
    fireEvent.change(sportSelect, { target: { value: 'Soccer' } })
    expect(screen.getByText('Soccer Depth Chart')).toBeInTheDocument()
  })

  test('opens Add Player dialog when button is clicked', () => {
    render(<Challenge />)
    const addButton = screen.getByRole('button', { name: /add a player/i })
    fireEvent.click(addButton)
    expect(screen.getByText('Add a Player')).toBeInTheDocument()
  })

  test('adds player to depth chart when form is submitted', async () => {
    render(<Challenge />)
    // Open dialog, fill form, and submit
    // Assert that new player appears in depth chart
  })

  test('removes player from depth chart', async () => {
    render(<Challenge />)
    // Find a player, open dropdown, click remove
    // Assert that player is no longer in depth chart
  })
})
