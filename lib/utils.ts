import { Player } from '@/app/types'
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const generateRandomName = () => {
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

export const generateRandomPlayers = (count: number): Player[] => {
  return Array.from({ length: count }, () => ({
    id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
    name: generateRandomName(),
  }))
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
