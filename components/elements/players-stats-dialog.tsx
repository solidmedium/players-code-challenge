import { PlayerStats } from '@/app/types'
import { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog'
import { Card } from '../ui/card'

const PlayerStatsDialog = ({ player }: { player: PlayerStats }) => {
  const [open, setOpen] = useState(false)
  if (!player.performance) {
    return <p className="text-sm">-</p>
  }
  const { performance } = player
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>{player.name}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{player.name}</DialogTitle>
          <DialogDescription>
            Key statistics for {player.name} in the {player.sport} league.
          </DialogDescription>
        </DialogHeader>
        <div className="grid grid-cols-1 gap-4 text-sm md:grid-cols-3">
          <Card>
            <div className="flex justify-between p-3">
              Total
              <br /> Actions
              <p className="text-3xl font-bold">{performance?.totalActions}</p>
            </div>
          </Card>
          <Card>
            <div className="flex justify-between p-3">
              Successful Actions
              <p className="text-3xl font-bold">{performance?.successfulActions}</p>
            </div>
          </Card>
          <Card>
            <div className="flex justify-between p-3">
              Success Rate (%)
              <p className="text-3xl font-bold">{performance?.successRate}</p>
            </div>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default PlayerStatsDialog
