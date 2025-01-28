import { PlayerStats } from '@/app/types'
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

const generateRandomName = (): string => {
  const firstNames = [
    'John',
    'Mike',
    'Chris',
    'David',
    'Tom',
    'Steve',
    'Alex',
    'Sam',
    'Ryan',
    'Dan',
  ]
  const lastNames = [
    'Smith',
    'Johnson',
    'Williams',
    'Brown',
    'Jones',
    'Garcia',
    'Miller',
    'Davis',
    'Rodriguez',
    'Martinez',
  ]
  return `${firstNames[Math.floor(Math.random() * firstNames.length)]} ${lastNames[Math.floor(Math.random() * lastNames.length)]}`
}

const generateRandomStat = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

const generateRandomPlayerStats = (
  name?: string,
  sport?: string,
  position?: string,
): PlayerStats => {
  const totalActions = generateRandomStat(50, 150)
  const successfulActions = generateRandomStat(0, totalActions)
  const successRate = Number(((successfulActions / totalActions) * 100).toFixed(1))

  const conversionsAttempted = generateRandomStat(5, 15)
  const conversionsSuccessful = generateRandomStat(0, conversionsAttempted)
  const conversionRate = Number(((conversionsSuccessful / conversionsAttempted) * 100).toFixed(1))

  return {
    id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
    name: name ? name : generateRandomName(),
    sport: sport ? sport : 'Generic Sport',
    position: position ? position : 'Generic Position',
    performance: {
      totalActions,
      successfulActions,
      successRate,
      contestsWon: generateRandomStat(10, 30),
      conversions: {
        attempted: conversionsAttempted,
        successful: conversionsSuccessful,
        rate: conversionRate,
      },
      distanceCovered: {
        total: generateRandomStat(5000, 12000),
        highIntensity: generateRandomStat(1000, 3000),
      },
      possession: {
        timeInSeconds: generateRandomStat(200, 600),
        percentageOfGame: generateRandomStat(10, 40),
      },
    },
  }
}

export const generateRandomPlayers = (
  count: number,
  name?: string,
  sport?: string,
  position?: string,
): PlayerStats[] => {
  return Array.from({ length: count }, () => generateRandomPlayerStats(name, sport, position))
}

export const getTailwindColor = () => {
  const colors = [
    'bg-red-500',
    'bg-blue-500',
    'bg-green-500',
    'bg-yellow-500',
    'bg-purple-500',
    'bg-pink-500',
    'bg-indigo-500',
    'bg-teal-500',
    'bg-orange-500',
    'bg-cyan-500',
  ]
  return colors[Math.floor(Math.random() * colors.length)]
}
