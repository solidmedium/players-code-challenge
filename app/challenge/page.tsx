'use client'

import { useEffect, useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { useDepthChartStore } from '@/app/store'
import { Player, Sport } from '@/app/types'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { EllipsisIcon } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'

const NFL: Sport = {
  name: 'NFL',
  positions: ['QB', 'WR', 'RB', 'TE', 'K', 'P', 'KR', 'PR'],
}

const Soccer: Sport = {
  name: 'Soccer',
  positions: ['GK', 'RB', 'LB', 'CDM', 'CAM', 'RW', 'LW', 'SS', 'ST'],
}

const formSchema = z.object({
  sport: z.enum(['NFL', 'Soccer'], {
    required_error: 'You must select a sport.',
  }),
  position: z.string().min(1, 'You must select a position.'),
  playerName: z
    .string()
    .min(2, 'Player name must be at least 2 characters.')
    .max(50, 'Player name must not exceed 50 characters.'),
  spot: z.number().int().min(0).optional(),
})

const generateRandomName = () => {
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

const generateRandomPlayers = (count: number): Player[] => {
  return Array.from({ length: count }, () => ({
    id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
    name: generateRandomName(),
  }))
}

export default function Home() {
  const [selectedSport, setSelectedSport] = useState<Sport>(NFL)
  const { addPlayer, removePlayer, getFullDepthChart } = useDepthChartStore()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      sport: 'NFL',
      position: '',
      playerName: '',
      spot: undefined,
    },
  })

  useEffect(() => {
    const initializeDepthCharts = () => {
      ;[NFL, Soccer].forEach(sport => {
        sport.positions.forEach(position => {
          const players = generateRandomPlayers(Math.floor(Math.random() * 4) + 1)
          players.forEach((player, index) => {
            addPlayer(sport, position, player, index)
          })
        })
      })
    }

    // Check if the depth charts are empty before initializing
    if (getFullDepthChart().length === 0) {
      initializeDepthCharts()
    }
  }, [addPlayer, getFullDepthChart])

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    const player: Player = { id: Date.now().toString(), name: values.playerName }
    const sport = values.sport === 'NFL' ? NFL : Soccer
    addPlayer(sport, values.position, player, values.spot)
    form.reset()
  }

  const handleRemovePlayer = (sport: Sport, position: string, playerId: string) => {
    removePlayer(sport, position, playerId)
  }

  const depthChart = getFullDepthChart(selectedSport)

  console.log('selected: ', selectedSport)
  return (
    <div className="container mx-auto p-4">
      <h1 className="mb-4 text-2xl font-bold">Depth Chart Manager</h1>
      <div className="mb-4 flex items-center space-x-4">
        <Select onValueChange={value => setSelectedSport(value === 'NFL' ? NFL : Soccer)}>
          <SelectTrigger>
            <SelectValue placeholder="Select a sport" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="NFL">NFL</SelectItem>
            <SelectItem value="Soccer">Soccer</SelectItem>
          </SelectContent>
        </Select>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="hover:bg-slate-600">Add a Player</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add a Player</DialogTitle>
              <DialogDescription>
                Use the form below to add a player to the depth chart.
              </DialogDescription>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <FormField
                    control={form.control}
                    name="sport"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Sport</FormLabel>
                        <Select
                          onValueChange={value => {
                            field.onChange(value)
                            setSelectedSport(value === 'NFL' ? NFL : Soccer)
                            form.setValue('position', '')
                          }}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a sport" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="NFL">NFL</SelectItem>
                            <SelectItem value="Soccer">Soccer</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="position"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Position</FormLabel>
                        <Select onValueChange={field.onChange}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a position" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {selectedSport.positions.map(pos => (
                              <SelectItem key={pos} value={pos}>
                                {pos}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="playerName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Player Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter player name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="spot"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Spot (optional)</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            placeholder="Enter spot number"
                            {...field}
                            onChange={e =>
                              field.onChange(
                                e.target.value === '' ? undefined : parseInt(e.target.value),
                              )
                            }
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button variant={'outline'} type="submit">
                    Add a Player
                  </Button>
                </form>
              </Form>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </div>

      <div className="mt-8">
        <h2 className="mb-2 text-xl font-semibold">{selectedSport.name} Depth Chart</h2>
        {depthChart.map(chart => (
          <div key={chart.sport.name} className="mb-8">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Position</TableHead>
                  <TableHead>Starter</TableHead>
                  <TableHead>Second</TableHead>
                  <TableHead>Third</TableHead>
                  <TableHead>Forth</TableHead>
                  <TableHead className="flex items-center justify-end">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {chart.chart.map(entry => (
                  <TableRow key={entry.position}>
                    <TableCell>{entry.position}</TableCell>
                    <TableCell>{entry.players[0]?.name || '-'}</TableCell>
                    <TableCell>{entry.players[1]?.name || '-'}</TableCell>
                    <TableCell>{entry.players[2]?.name || '-'}</TableCell>
                    <TableCell>{entry.players[3]?.name || '-'}</TableCell>
                    <TableCell className="flex justify-end">
                      <DropdownMenu>
                        <DropdownMenuTrigger>
                          <EllipsisIcon />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Remove</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          {entry.players.map((player, index) => (
                            <DropdownMenuItem className="p-0" key={player.id}>
                              <Button
                                variant="link"
                                size="sm"
                                onClick={() =>
                                  handleRemovePlayer(chart.sport, entry.position, player.id)
                                }>
                                {/* {index === 0 ? 'Starter' : index === 1 ? 'Second' : 'Third'}{' '} */}
                                {player.name}
                              </Button>
                            </DropdownMenuItem>
                          ))}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        ))}
      </div>
    </div>
  )
}
