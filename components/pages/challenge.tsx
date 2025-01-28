'use client'

import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { useDepthChartStore } from '@/app/store'
import { Player, Sport, Spots } from '@/app/types'
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
  FormDescription,
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
import { ArrowRight, Delete, EllipsisIcon, PlusCircleIcon } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { generateRandomPlayers, generateRandomPlayerStats } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'
import PlayerStatsDialog from '../elements/players-stats-dialog'

const NFL: Sport = {
  name: 'NFL',
  positions: ['QB', 'WR', 'RB', 'TE', 'K', 'P', 'KR', 'PR'],
}

const soccer: Sport = {
  name: 'Soccer',
  positions: ['GK', 'RB', 'LB', 'CDM', 'CAM', 'RW', 'LW', 'SS', 'ST'],
}

const sports: Sport[] = [NFL, soccer]

const spots: Spots[] = [
  { label: 'Starter', value: '0' },
  { label: 'Second', value: '1' },
  { label: 'Third', value: '2' },
  { label: 'Forth', value: '3' },
]

const formSchema = z.object({
  sport: z.string().min(2, 'Sport name must be at least 2 characters.'),
  position: z.string().min(1, 'You must select a position.'),
  playerName: z
    .string()
    .min(2, 'Player name must be at least 2 characters.')
    .max(50, 'Player name must not exceed 50 characters.'),
  spot: z.string().optional(),
})

const formSportSchema = z.object({
  sport: z.string().min(2, 'Sport name must be at least 2 characters.'),
  positions: z.string().min(1, 'Positions must be at least 1 character.'),
})

export default function Challenge() {
  const [selectedSport, setSelectedSport] = useState<Sport>(sports[0])
  const { addPlayer, removePlayer, getFullDepthChart } = useDepthChartStore()
  const [open, setOpen] = useState(false)
  const [openSport, setOpenSport] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      sport: 'NFL',
      position: '',
      playerName: '',
      spot: '4',
    },
  })

  const sportForm = useForm<z.infer<typeof formSportSchema>>({
    resolver: zodResolver(formSportSchema),
    defaultValues: {
      sport: '',
      positions: '',
    },
  })

  useEffect(() => {
    const initializeDepthCharts = () => {
      sports.forEach(sport => {
        sport.positions.forEach(position => {
          const players = generateRandomPlayers(
            Math.floor(Math.random() * 4) + 1,
            '',
            sport.name,
            position,
          )
          players.forEach((player, index) => {
            addPlayer(sport, player, index)
          })
        })
      })
    }

    // Check if the depth charts are empty before initializing
    if (getFullDepthChart().length === 0) {
      initializeDepthCharts()
    }
  }, [addPlayer, getFullDepthChart])

  const handleSelectedSport = (value: string) => {
    const filteredSport = sports.filter(sport => sport.name === value)
    setSelectedSport(filteredSport[0])
  }

  const onPlayerSubmit = (values: z.infer<typeof formSchema>) => {
    const player: Player = { id: Date.now().toString(), name: values.playerName }
    console.log('values', values)
    handleSelectedSport(values.sport)
    // Convert spot to number to fix type cross over issue
    addPlayer(
      selectedSport,
      generateRandomPlayerStats(values.playerName, selectedSport.name, values.position),
      Number(values.spot),
    )
    form.reset()
    setOpen(false)
  }

  const onSportSubmit = (values: z.infer<typeof formSportSchema>) => {
    const sport: Sport = {
      name: values.sport,
      positions: values.positions.split(',').map(p => p.trim()),
    }
    sports.push(sport)
    setSelectedSport(sport)
    sportForm.reset()
    setOpenSport(false)
  }

  const handleRemovePlayer = (sport: Sport, position: string, playerId: string) => {
    removePlayer(sport, position, playerId)
  }

  const depthChart = getFullDepthChart(selectedSport)

  console.log('depthChart', depthChart)

  return (
    <div className="container mx-auto mt-6 p-4 md:mt-12">
      <h1 className="mb-4 text-2xl font-bold">Depth Chart Manager</h1>
      <div className="mb-4 flex items-center justify-between space-x-4">
        <Select onValueChange={value => handleSelectedSport(value)}>
          <SelectTrigger>
            <SelectValue placeholder="Select a sport" />
          </SelectTrigger>
          <SelectContent>
            {sports.map(sport => (
              <SelectItem key={sport.name} value={sport.name}>
                {sport.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Dialog open={openSport} onOpenChange={setOpenSport}>
          <DialogTrigger asChild>
            <Button className="font-bold hover:bg-slate-600">
              Add a Sport <PlusCircleIcon />{' '}
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add a Sport</DialogTitle>
              <DialogDescription>
                Use the form below to add a sport to the depth chart.
              </DialogDescription>
              <Form {...sportForm}>
                <form onSubmit={sportForm.handleSubmit(onSportSubmit)} className="space-y-4">
                  <FormField
                    control={sportForm.control}
                    name="sport"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Sport Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter Sport name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={sportForm.control}
                    name="positions"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Positions</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter positions" {...field} />
                        </FormControl>
                        <FormDescription>
                          Enter positions separated by commas. E.g. QB, WR, RB
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button className="w-full hover:bg-slate-600" type="submit">
                    <ArrowRight /> Add a Sport
                  </Button>
                </form>
              </Form>
            </DialogHeader>
          </DialogContent>
        </Dialog>

        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button className="font-bold hover:bg-slate-600">
              Add a Player <PlusCircleIcon />{' '}
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add a Player</DialogTitle>
              <DialogDescription>
                Use the form below to add a player to the depth chart.
              </DialogDescription>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onPlayerSubmit)} className="space-y-4">
                  <FormField
                    control={form.control}
                    name="sport"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Sport</FormLabel>
                        <Select
                          onValueChange={value => {
                            field.onChange(value)
                            handleSelectedSport(value)
                            form.setValue('position', '')
                          }}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a sport" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {sports.map(sport => (
                              <SelectItem key={sport.name} value={sport.name}>
                                {sport.name}
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
                        <Select onValueChange={field.onChange}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a spot" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {spots.map(spot => (
                              <SelectItem key={spot.value} value={spot.value}>
                                {spot.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button className="w-full hover:bg-slate-600" type="submit">
                    <ArrowRight /> Add a Player
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
                  <TableHead className="w-[2%]">Position</TableHead>
                  <TableHead className="w-[22%]">Starter</TableHead>
                  <TableHead className="w-[22%]">Second</TableHead>
                  <TableHead className="w-[22%]">Third</TableHead>
                  <TableHead className="w-[22%]">Forth</TableHead>
                  <TableHead className="w-[8%] text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {chart.chart.map(entry => (
                  <TableRow key={entry.position}>
                    <TableCell className="font-bold">
                      <Badge className="hover:bg-primary">{entry.position}</Badge>
                    </TableCell>
                    <TableCell>
                      {entry.players[0] ? <PlayerStatsDialog player={entry.players[0]} /> : '-'}
                    </TableCell>
                    <TableCell>
                      {entry.players[1] ? <PlayerStatsDialog player={entry.players[1]} /> : '-'}
                    </TableCell>
                    <TableCell>
                      {entry.players[2] ? <PlayerStatsDialog player={entry.players[2]} /> : '-'}
                    </TableCell>
                    <TableCell>
                      {entry.players[3] ? <PlayerStatsDialog player={entry.players[3]} /> : '-'}
                    </TableCell>
                    <TableCell className="flex justify-end">
                      <DropdownMenu>
                        <DropdownMenuTrigger>
                          <EllipsisIcon />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Remove</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          {entry.players.map(player => (
                            <DropdownMenuItem className="p-0" key={player.id}>
                              <Button
                                variant="link"
                                size="sm"
                                className="flex flex-1 justify-between hover:no-underline"
                                onClick={() =>
                                  handleRemovePlayer(chart.sport, entry.position, player.id)
                                }>
                                {player.name} <Delete size={'16'} />
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
